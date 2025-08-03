import { useEffect, useRef } from "react";

type UseInfiniteScrollParams = {
  loading: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<any>;
  threshold?: number;
};

export function useInfiniteScroll({
  loading,
  hasMore,
  fetchNextPage,
  threshold = 100,
}: UseInfiniteScrollParams) {
  const throttleTimeout = useRef<number | null>(null);
  const isFetching = useRef(false); // локальный флаг

  useEffect(() => {
    const fetchWithScrollRestore = async () => {
      isFetching.current = true;
      try {
        await fetchNextPage();
      } finally {
        isFetching.current = false;
      }
    };

    const handleScroll = () => {
      if (throttleTimeout.current !== null) return;

      throttleTimeout.current = window.setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        const isNearBottom =
          documentHeight - (scrollTop + windowHeight) < threshold;

        if (isNearBottom && !loading && hasMore && !isFetching.current) {
          fetchWithScrollRestore();
        }

        throttleTimeout.current = null;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    };
  }, [loading, hasMore, fetchNextPage, threshold]);
}
