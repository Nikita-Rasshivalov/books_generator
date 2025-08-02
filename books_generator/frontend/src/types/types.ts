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
  coverUrl?: string;
}

export interface BookFilters {
  seed: string;
  lang: string;
  likes: number;
  reviews: number;
}

export interface BookDataState {
  books: Book[];
  page: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

export interface BookActions {
  fetchNextPage: () => Promise<Book[]>;
  resetBooks: () => Promise<void>;
  setParams: (params: Partial<BookFilters>) => void;
  setParamAndResetBooksBatch: (params: Partial<BookFilters>) => Promise<void>;
}

export type BookState = BookFilters & BookDataState & BookActions;

export type BookQueryParams = Partial<BookFilters>;

export type FiltersProps = {
  initialFilters: BookQueryParams;
  onResetBooks: () => void;
  onSetParamsBatch: (params: BookQueryParams) => void;
};

export interface Params {
  seed: string;
  lang?: string;
  likes?: number;
  reviews?: number;
  page: number;
}
