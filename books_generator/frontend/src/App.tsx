import { useEffect, useRef, useState } from "react";
import BookGallery from "./components/books/BookGallery";
import BookTable from "./components/books/BookTable";
import Filters from "./components/filters/Filters";
import { Container } from "./components/layout/Container";
import { ContainerFixed } from "./components/layout/ContainerFixed";
import { Header } from "./components/layout/Header";
import { useBooksStore } from "./store/booksStore";

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
  const didResetRef = useRef(false);

  useEffect(() => {
    if (!didResetRef.current) {
      resetBooks();
      didResetRef.current = true;
    }
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
