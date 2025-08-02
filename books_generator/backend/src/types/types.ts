export interface Review {
  author: string;
  text: string;
}

export interface Book {
  index: number;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  likes: number;
  reviews: Review[];
  coverUrl: string;
}

export interface GenerateOptions {
  seed: string;
  page: number;
  lang: string;
  likes: number;
  reviews: number;
}
