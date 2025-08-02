import { Faker, de, ja, en } from "@faker-js/faker";
import { Review, GenerateOptions, Book } from "../types/types.ts";
import { createSeededRNG } from "../utils/random.ts";

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

export function generateBooks(options: GenerateOptions): Book[] {
  const { seed, page, lang, likes, reviews } = options;

  const fullSeed = `${seed}-${page}`;
  const rng = createSeededRNG(fullSeed);
  const faker = getFakerByLocale(lang);

  const count = 20;

  const books: Book[] = [];

  for (let i = 0; i < count; i++) {
    books.push({
      index: page * 20 + i + 1,
      isbn: `${Math.floor(rng() * 1e13)}`,
      title: faker.lorem.words({ min: 2, max: 5 }),
      authors: [faker.person.fullName()],
      publisher: faker.company.name(),
      likes,
      reviews: generateReviews(faker, rng, reviews),
      coverUrl: `https://source.unsplash.com/200x300/?book,cover,${i}`,
    });
  }

  return books;
}
