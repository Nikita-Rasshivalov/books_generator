import { create } from "zustand";
import { loadBooks } from "../services/booksService";
import { Params, BookState, Book } from "../types/types";

const getFetchParams = (state: BookState, page: number): Params => ({
  seed: state.seed,
  lang: state.lang || "en",
  likes: state.likes,
  reviews: state.reviews,
  page,
});

export const useBooksStore = create<BookState>((set, get) => ({
  books: [],
  page: 0,
  seed: "default",
  lang: "en",
  likes: 0,
  reviews: 0,
  loading: false,
  error: null,
  hasMore: true,

  fetchNextPage: async (page?: number): Promise<Book[]> => {
    const state = get();
    const nextPage = page ?? state.page + 1;

    if (state.loading || !state.hasMore) return [];

    set({ loading: true, error: null });

    try {
      const newBooks = await loadBooks(getFetchParams(state, nextPage));

      set((prev) => {
        const existingISBNs = new Set(prev.books.map((b) => b.isbn));
        const filteredNewBooks = newBooks.filter(
          (b) => !existingISBNs.has(b.isbn)
        );

        return {
          books:
            nextPage === 1
              ? filteredNewBooks
              : [...prev.books, ...filteredNewBooks],
          page: nextPage,
          loading: false,
          hasMore: filteredNewBooks.length > 0,
        };
      });
      return newBooks;
    } catch (error: any) {
      set({ error: error.message || "Failed to load books", loading: false });
      return [];
    }
  },

  resetBooks: async () => {
    const state = get();
    const params = getFetchParams(state, 1);
    set({ loading: true, error: null, page: 0, hasMore: true });
    try {
      const newBooks = await loadBooks(params);
      set({
        books: newBooks,
        page: 1,
        loading: false,
        hasMore: newBooks.length > 0,
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to load books", loading: false });
    }
  },

  setParams: (params) => set((state) => ({ ...state, ...params })),

  setParamAndResetBooksBatch: async (params: Partial<BookState>) => {
    set((state) => ({ ...state, ...params }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    get().resetBooks();
  },
}));
