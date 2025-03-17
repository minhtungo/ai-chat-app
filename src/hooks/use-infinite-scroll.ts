import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
};

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  threshold = 100,
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
    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  return { containerRef };
}
