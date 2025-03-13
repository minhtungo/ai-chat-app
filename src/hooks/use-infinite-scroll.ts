import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
};

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  threshold = 0.1,
}: UseInfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px`,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  return { containerRef };
}
