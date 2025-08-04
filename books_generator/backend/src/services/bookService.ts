import { Faker, de, ja, en, base } from "@faker-js/faker";
import { Review, GenerateOptions, Book } from "../types/types.ts";
import { createSeededRNG } from "../utils/random.ts";
import { generateBookCover } from "../utils/coverGenerator.ts";

function getFakerByLocale(lang: string): Faker {
  switch (lang.toLowerCase()) {
    case "ja":
      return new Faker({ locale: [ja, en, base] });
    case "de":
      return new Faker({ locale: [de, en, base] });
    case "en":
    default:
      return new Faker({ locale: [en, base] });
  }
}

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
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

const japaneseAdjectives = ["美しい", "速い", "古い", "新しい", "静かな"];
const japaneseNouns = ["山", "川", "森", "海", "空"];

function getRandomElement(arr: string[], rng: () => number): string {
  return arr[Math.floor(rng() * arr.length)];
}

function generateBookTitleJapanese(rng: () => number): string {
  const templates = [
    `美しい${getRandomElement(japaneseNouns, rng)}`,
    `${getRandomElement(japaneseNouns, rng)}の秘密`,
    `新しい${getRandomElement(japaneseNouns, rng)}の物語`,
    `${getRandomElement(japaneseAdjectives, rng)}${getRandomElement(
      japaneseNouns,
      rng
    )}`,
  ];
  return templates[Math.floor(rng() * templates.length)];
}

function generateBookTitle(
  faker: Faker,
  lang: string,
  rng: () => number
): string {
  if (lang.toLowerCase() === "ja") {
    return generateBookTitleJapanese(rng);
  }

  const templates = [
    `The ${faker.word.adjective()} ${faker.word.noun()}`,
    `${faker.word.noun()} of ${faker.location.city()}`,
    `The Secrets of ${faker.person.firstName()}`,
    `A Tale of ${faker.word.adjective()} ${faker.word.noun()}`,
    `${faker.word.verb()} the ${faker.word.noun()}`,
    `Return to ${faker.location.city()}`,
    `Chronicles of the ${faker.word.adjective()} ${faker.word.noun()}`,
    `${faker.word.noun()} and ${faker.word.noun()}`,
    `In the Shadow of ${faker.person.lastName()}`,
    `Whispers of the ${faker.word.noun()}`,
  ];

  return faker.helpers.arrayElement(templates);
}

export async function generateBooks(options: GenerateOptions): Promise<Book[]> {
  const { seed, page, lang, likes, reviews } = options;

  const fullSeed = `${seed}-${page}`;
  const rng = createSeededRNG(fullSeed);
  const faker = getFakerByLocale(lang);
  faker.seed(stringToSeed(fullSeed));

  const count = 20;
  const books: Book[] = [];

  for (let i = 0; i < count; i++) {
    const isbn = `${Math.floor(rng() * 1e13)}`;
    const title = generateBookTitle(faker, lang, rng);
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
