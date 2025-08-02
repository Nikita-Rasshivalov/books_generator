import { useBooksStore } from "../store/booksStore";
import { CSVLink } from "react-csv";

const ExportButton = () => {
  const { books } = useBooksStore();

  const headers = [
    { label: "Index", key: "index" },
    { label: "ISBN", key: "isbn" },
    { label: "Title", key: "title" },
    { label: "Authors", key: "authors" },
    { label: "Publisher", key: "publisher" },
    { label: "Likes", key: "likes" },
    { label: "Reviews", key: "reviews" },
  ];

  const data = books.map((book, i) => ({
    index: i + 1,
    isbn: book.isbn,
    title: book.title,
    authors: book.authors,
    publisher: book.publisher,
    likes: book.likes,
    reviews: Array.isArray(book.reviews)
      ? book.reviews.map((r) => r.text).join("; ")
      : book.reviews || "",
  }));

  return (
    <CSVLink
      headers={headers}
      data={data}
      filename={"books_export.csv"}
      className="w-full h-10 px-4 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition flex justify-center items-center text-center"
    >
      Export as CSV
    </CSVLink>
  );
};

export default ExportButton;
