import React from "react";
import { Book } from "../../types/types";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

type Props = {
  books: Book[];
  loading: boolean;
  error?: string | null;
  hasMore: boolean;
  fetchNextPage: () => Promise<Book[]>;
  onSelect?: (book: Book) => void;
};

const BookGallery = React.memo(
  ({ books, loading, hasMore, fetchNextPage, onSelect }: Props) => {
    useInfiniteScroll({ loading, hasMore, fetchNextPage });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {books.map((book) => {
          const cover = book.coverUrl;
          return (
            <div
              key={book.isbn}
              className="
                cursor-pointer
                rounded-xl
                border border-gray-200
                bg-white
                shadow-md
                hover:shadow-xl
                transition-shadow duration-300 ease-in-out
                dark:bg-gray-800 dark:border-gray-700
                opacity-0
                animate-fadeIn
              "
              onClick={() => onSelect && onSelect(book)}
            >
              <img
                src={cover}
                alt={book.title}
                className="w-full h-60 sm:h-72 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                  {book.authors.join(", ")}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Likes: <span className="font-bold">{book.likes}</span>
                </p>
              </div>
            </div>
          );
        })}
        {loading && books.length > 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Loading more...
          </div>
        )}
      </div>
    );
  }
);

export default BookGallery;
