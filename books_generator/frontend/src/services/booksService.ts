import { fetchBooks } from "../api/booksApi";
import { Book, Params } from "../types/types";

export const normalizeBooks = (books: Book[]): Book[] =>
  books.map((book) => ({
    ...book,
    reviews: Array.isArray(book.reviews) ? book.reviews : [],
  }));

export const loadBooks = async (params: Params): Promise<Book[]> => {
  const data = await fetchBooks(params);
  return normalizeBooks(data);
};
