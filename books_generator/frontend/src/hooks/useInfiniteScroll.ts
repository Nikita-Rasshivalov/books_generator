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
  const lastScroll = useRef(window.scrollY);
  const throttleTimeout = useRef<number | null>(null);

  useEffect(() => {
    const fetchWithScrollRestore = async () => {
      lastScroll.current = window.scrollY;
      await fetchNextPage();
      requestAnimationFrame(() => {
        window.scrollTo(0, lastScroll.current);
      });
    };

    const handleScroll = () => {
      if (throttleTimeout.current !== null) return;

      throttleTimeout.current = window.setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        const isNearBottom =
          documentHeight - (scrollTop + windowHeight) < threshold;

        if (isNearBottom && !loading && hasMore) {
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
