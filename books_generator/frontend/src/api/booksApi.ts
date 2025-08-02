import { Book, Params } from "../types/types";
import axiosInstance from "../services/axiosInstance";

interface BooksResponse {
  books: Book[];
}

export const fetchBooks = async (params: Params): Promise<Book[]> => {
  const res = await axiosInstance.get<BooksResponse>("/api/books", { params });
  return res.data.books;
};
