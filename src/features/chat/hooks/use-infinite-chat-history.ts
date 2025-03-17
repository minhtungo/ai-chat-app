import { useChatStoreIsStreaming } from '@/store/chat-store';
import type { ChatMessage } from '@/types/chat';
import { useEffect, useRef } from 'react';

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

  // Track if user is near bottom whenever scrolling happens
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Check if user is near the bottom (within 100px)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    isUserNearBottomRef.current = isNearBottom;
  };

  // Store scroll height before loading older messages
  useEffect(() => {
    if (isFetchingNextPage && chatContainerRef.current) {
      scrollHeightBeforeLoadRef.current = chatContainerRef.current.scrollHeight;
    }
  }, [isFetchingNextPage]);

  // Adjust scroll position after messages are loaded or added
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // First load - always scroll to bottom
    if (prevMessagesLengthRef.current === 0) {
      container.scrollTop = container.scrollHeight;
    }
    // When older messages are loaded (at the top)
    else if (
      messages.length > prevMessagesLengthRef.current &&
      isFetchingNextPage === false
    ) {
      // When loading older messages - maintain position
      if (scrollHeightBeforeLoadRef.current > 0) {
        const newScrollHeight = container.scrollHeight;
        const addedHeight = newScrollHeight - scrollHeightBeforeLoadRef.current;

        if (addedHeight > 0) {
          container.scrollTop = addedHeight;
        }
        scrollHeightBeforeLoadRef.current = 0; // Reset for next time
      }
      // When new messages are added at the bottom and user was near bottom
      else if (isUserNearBottomRef.current) {
        // Scroll to bottom with a slight delay to ensure content is rendered
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages.length, isFetchingNextPage]);

  // Scroll to bottom when AI is streaming responses
  useEffect(() => {
    if (isStreaming && isUserNearBottomRef.current) {
      const container = chatContainerRef.current;
      if (!container) return;

      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [isStreaming, messages]); // Add messages dependency to catch content updates

  // Add scroll event listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { topRef, chatContainerRef };
}
