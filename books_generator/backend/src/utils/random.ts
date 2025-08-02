import seedrandom from "seedrandom";

export function createSeededRNG(seed: string): () => number {
  const rng = seedrandom(seed);
  return () => rng();
}
