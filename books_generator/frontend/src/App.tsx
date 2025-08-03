import { useEffect, useState } from "react";
import { useBooksStore } from "./store/booksStore";
import Filters from "./components/filters/Filters";
import { Header } from "./components/layout/Header";
import { Container } from "./components/layout/Container";
import BookGallery from "./components/books/BookGallery";
import BookTable from "./components/books/BookTable";
import { ContainerFixed } from "./components/layout/ContainerFixed";
export default function App() {
  const {
    books,
    resetBooks,
    loading,
    error,
    fetchNextPage,
    hasMore,
    lang,
    seed,
    likes,
    reviews,
    setParamAndResetBooksBatch,
  } = useBooksStore();

  const [viewMode, setViewMode] = useState<"table" | "gallery">("table");

  useEffect(() => {
    resetBooks();
  }, [resetBooks]);

  return (
    <>
      <ContainerFixed>
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        <Filters
          initialFilters={{ lang, seed, likes, reviews }}
          onResetBooks={resetBooks}
          onSetParamsBatch={setParamAndResetBooksBatch}
        />
      </ContainerFixed>

      <Container>
        {!loading && !error && (
          <div className="wrapper">
            {viewMode === "table" ? (
              <BookTable
                books={books}
                loading={loading}
                error={error}
                fetchNextPage={fetchNextPage}
                hasMore={hasMore}
              />
            ) : (
              <BookGallery
                books={books}
                loading={loading}
                hasMore={hasMore}
                fetchNextPage={fetchNextPage}
              />
            )}
          </div>
        )}
      </Container>
    </>
  );
}
