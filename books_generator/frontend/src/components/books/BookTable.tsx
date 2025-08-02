import { useState } from "react";
import { Book } from "../../types/types";
import BookRow from "./BookRow";
import ErrorMessage from "../layout/ErrorMessage";
import LoadingIndicator from "../layout/LoadingIndicator";
import BookTableHeader from "./BookTableHeader";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

type Props = {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchNextPage: (page?: number) => Promise<Book[]>;
  hasMore: boolean;
};

const BookTable = ({
  books,
  loading,
  error,
  fetchNextPage,
  hasMore,
}: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useInfiniteScroll({ loading, hasMore, fetchNextPage });

  const toggleExpand = (bookIndex: number) => {
    setExpandedIndex((prev) => (prev === bookIndex ? null : bookIndex));
  };

  if (loading && books.length === 0)
    return (
      <div className="flex justify-center py-10">
        <LoadingIndicator />
      </div>
    );

  if (error)
    return (
      <div className="p-4">
        <ErrorMessage message={error} />
      </div>
    );

  if (books.length === 0)
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        No books found.
      </div>
    );

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
      <BookTableHeader />
      <div className="overflow-x-auto sm:overflow-x-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 min-w-max">
          {books.map((book, idx) => (
            <BookRow
              key={book.isbn}
              book={book}
              index={idx + 1}
              isExpanded={expandedIndex === idx}
              onToggle={() => toggleExpand(idx)}
            />
          ))}
          {hasMore && <LoadingIndicator />}
        </div>
      </div>
    </div>
  );
};

export default BookTable;
