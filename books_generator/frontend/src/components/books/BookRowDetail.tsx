import { Book } from "../../types/types";

type Props = {
  book: Book;
};

const ReviewsList = ({ reviews }: { reviews: Book["reviews"] }) => {
  if (reviews.length === 0)
    return (
      <div className="text-sm italic text-gray-500 dark:text-gray-400">
        No reviews yet
      </div>
    );

  return (
    <ul className="list-disc list-inside space-y-1 mt-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
      {reviews.map((r, i) => (
        <li
          key={i}
          className="text-sm text-gray-700 dark:text-gray-300"
          title={`Review by ${r.author}`}
        >
          <strong>{r.author}:</strong> {r.text}
        </li>
      ))}
    </ul>
  );
};

const BookRowDetail = ({ book }: Props) => {
  const cover = book.coverUrl;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <img
        src={cover}
        alt={book.title}
        className="w-full max-w-[160px] h-auto aspect-[2/3] object-cover rounded-lg shadow-sm flex-shrink-0 mx-auto md:mx-0"
      />

      <div className="flex-1 flex flex-col justify-between px-4 md:px-0">
        <div className="space-y-3">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate text-center md:text-left">
            {book.title}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            <span className="font-semibold">Publisher:</span> {book.publisher}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            <span className="font-semibold">Authors:</span>{" "}
            {book.authors.join(", ")}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            <span className="font-semibold">Likes:</span> {book.likes}
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Reviews ({book.reviews.length}):
            </span>
            <ReviewsList reviews={book.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRowDetail;
