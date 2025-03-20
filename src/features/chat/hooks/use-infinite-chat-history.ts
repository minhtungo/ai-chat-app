import { useChatStoreIsStreaming } from '@/features/chat/store/chat-store';
import type { ChatMessage } from '@/types/chat';
import { useEffect, useRef, useState } from 'react';

type UseInfiniteChatHistoryProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  messages: ChatMessage[];
  isFetchingNextPage: boolean;
  threshold?: number;
};

export function useInfiniteChatHistory({
  hasNextPage,
  fetchNextPage,
  messages,
  isFetchingNextPage,
  threshold = 100,
}: UseInfiniteChatHistoryProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef<number>(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollHeightBeforeLoadRef = useRef<number>(0);
  const isUserNearBottomRef = useRef<boolean>(true);
  const isStreaming = useChatStoreIsStreaming();
  const [showScrollButton, setShowScrollButton] = useState(false);

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
    const currentContainer = topRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasNextPage, fetchNextPage, threshold]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    isUserNearBottomRef.current = isNearBottom;

    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    if (isFetchingNextPage && chatContainerRef.current) {
      scrollHeightBeforeLoadRef.current = chatContainerRef.current.scrollHeight;
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (prevMessagesLengthRef.current === 0) {
      container.scrollTop = container.scrollHeight;
    } else if (
      messages.length > prevMessagesLengthRef.current &&
      !isFetchingNextPage
    ) {
      if (scrollHeightBeforeLoadRef.current > 0) {
        const newScrollHeight = container.scrollHeight;
        const addedHeight = newScrollHeight - scrollHeightBeforeLoadRef.current;

        if (addedHeight > 0) {
          container.scrollTop = addedHeight;
        }
        scrollHeightBeforeLoadRef.current = 0;
      } else if (isUserNearBottomRef.current) {
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages.length, isFetchingNextPage]);

  useEffect(() => {
    if (isStreaming && isUserNearBottomRef.current) {
      const container = chatContainerRef.current;
      if (!container) return;

      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [isStreaming, messages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  };

  return { topRef, chatContainerRef, showScrollButton, scrollToBottom };
}
