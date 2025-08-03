import { Faker, de, ja, en } from "@faker-js/faker";
import { Review, GenerateOptions, Book } from "../types/types.ts";
import { createSeededRNG } from "../utils/random.ts";
import { generateBookCover } from "../utils/coverGenerator.ts";

function getFakerByLocale(lang: string): Faker {
  switch (lang.toLowerCase()) {
    case "de":
      return new Faker({ locale: [de] });
    case "ja":
      return new Faker({ locale: [ja] });
    case "en":
    default:
      return new Faker({ locale: [en] });
  }
}

function generateReviews(
  faker: Faker,
  rng: () => number,
  avg: number
): Review[] {
  const full = Math.floor(avg);
  const fractional = avg - full;
  const count = full + (rng() < fractional ? 1 : 0);

  return Array.from({ length: count }, () => ({
    author: faker.person.fullName(),
    text: faker.lorem.sentence(),
  }));
}
export async function generateBooks(options: GenerateOptions): Promise<Book[]> {
  const { seed, page, lang, likes, reviews } = options;

  const fullSeed = `${seed}-${page}`;
  const rng = createSeededRNG(fullSeed);
  const faker = getFakerByLocale(lang);

  const count = 20;

  const books: Book[] = [];
  for (let i = 0; i < count; i++) {
    const isbn = `${Math.floor(rng() * 1e13)}`;
    const title = faker.lorem.words({ min: 2, max: 5 });
    const author = faker.person.fullName();
    const coverBuffer = await generateBookCover(title, author, isbn);

    const coverBase64 = coverBuffer.toString("base64");

    books.push({
      index: page * 20 + i + 1,
      isbn,
      title,
      authors: [author],
      publisher: faker.company.name(),
      likes,
      reviews: generateReviews(faker, rng, reviews),
      coverUrl: `data:image/png;base64,${coverBase64}`,
    });
  }

  return books;
}
