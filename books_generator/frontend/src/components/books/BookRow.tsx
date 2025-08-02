import React from "react";
import { Book } from "../../types/types";
import BookRowDetail from "./BookRowDetail";

type Props = {
  book: Book;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

const BookRow = React.memo(({ book, index, isExpanded, onToggle }: Props) => (
  <>
    <div
      onClick={onToggle}
      className="
        cursor-pointer
        transition-colors
        hover:bg-gray-100 dark:hover:bg-gray-700
        border-b border-gray-200 dark:border-gray-700
        grid grid-cols-[40px_150px_1fr_1fr_1fr]
        px-2 py-3
        text-gray-700 dark:text-gray-300
        text-xs sm:text-sm
        whitespace-nowrap
      "
    >
      <div>{index}</div>
      <div className="max-w-[150px] truncate">{book.isbn}</div>
      <div className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px] sm:max-w-xs">
        {book.title}
      </div>
      <div className="text-gray-600 dark:text-gray-400 truncate max-w-[140px] sm:max-w-xs">
        {book.authors.join(", ")}
      </div>
      <div className="text-gray-600 dark:text-gray-400 truncate max-w-[140px] sm:max-w-xs">
        {book.publisher}
      </div>
    </div>

    {isExpanded && (
      <div className="bg-gray-50 dark:bg-gray-900 px-4 pb-4 pt-2 transition-all duration-300 ease-in-out">
        <div className="overflow-hidden">
          <BookRowDetail book={book} />
        </div>
      </div>
    )}
  </>
));

export default BookRow;
