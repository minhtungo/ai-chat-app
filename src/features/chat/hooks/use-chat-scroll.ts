import { useCallback, useEffect, useRef } from 'react';

type UseChatScrollOptions = {
  messages: any[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
};

export function useChatScroll({
  messages,
  hasNextPage,
  fetchNextPage,
  threshold = 200,
}: UseChatScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const initialScrollDoneRef = useRef<boolean>(false);
  const userHasScrolledRef = useRef<boolean>(false);
  const messagesLengthRef = useRef<number>(0);
  const prevScrollHeightRef = useRef<number>(0);
  const prevScrollTopRef = useRef<number>(0);
  const isLoadingRef = useRef<boolean>(false);

  // scroll to bottom on initial load and new messages
  const scrollToBottom = useCallback((smooth = false) => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  // Track scroll events and handle loading more messages
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Check if user has scrolled up
    if (!userHasScrolledRef.current) {
      if (scrollTop < scrollHeight - clientHeight - 10) {
        userHasScrolledRef.current = true;
      }
    }

    // infinite scrolling when scrolled near top
    if (
      userHasScrolledRef.current &&
      hasNextPage &&
      scrollTop < threshold &&
      !isLoadingRef.current
    ) {
      // Save current scroll position and height before loading more messages
      prevScrollHeightRef.current = scrollHeight;
      prevScrollTopRef.current = scrollTop;
      isLoadingRef.current = true;

      fetchNextPage();
    }

    // Initial scroll to bottom
    if (!initialScrollDoneRef.current && messages.length > 0) {
      scrollToBottom();
      initialScrollDoneRef.current = true;
    }
  }, [hasNextPage, fetchNextPage, threshold, messages, scrollToBottom]);

  //  check if new messages arrived and scroll to bottom if needed
  const checkNewMessages = useCallback(() => {
    if (!containerRef.current || !messages.length) return;

    if (messages.length > messagesLengthRef.current) {
      messagesLengthRef.current = messages.length;

      const container = containerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      if (isNearBottom) {
        scrollToBottom(true);
      }
    }
  }, [messages, scrollToBottom]);

  // Adjust scroll position after loading older messages
  useEffect(() => {
    if (
      containerRef.current &&
      isLoadingRef.current &&
      prevScrollHeightRef.current > 0
    ) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeightRef.current;

      if (heightDifference > 0) {
        // Adjust scroll position to maintain the same relative view
        containerRef.current.scrollTop =
          prevScrollTopRef.current + heightDifference;
      }

      isLoadingRef.current = false;
    }
  }, [messages]);

  if (messages.length !== messagesLengthRef.current) {
    checkNewMessages();
  }

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      containerRef.current = node;

      // Initial scroll to bottom when first mounted
      if (!initialScrollDoneRef.current && messages.length > 0) {
        node.scrollTop = node.scrollHeight;
        initialScrollDoneRef.current = true;
        messagesLengthRef.current = messages.length;
      }
    },
    [messages],
  );

  return {
    containerRef: setContainerRef,
    sentinelRef,
    showSentinel: hasNextPage && userHasScrolledRef.current,
    handleScroll,
  };
}
