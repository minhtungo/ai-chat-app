import { useSocket } from '@/features/chat/hooks/use-socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface VideoFeedback {
  segmentId: string;
  chatId: string;
  feedback: {
    text?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    detectedObjects?: string[];
    flags?: string[];
    score?: number;
  };
}

export function useVideoFeedback(chatId: string) {
  const [feedbacks, setFeedbacks] = useState<VideoFeedback[]>([]);
  const [latestFeedback, setLatestFeedback] = useState<VideoFeedback | null>(
    null,
  );
  const { isConnected, on, off } = useSocket();

  // Memoize the feedback handler to avoid recreating it on every render
  const handleFeedback = useCallback(
    (data: VideoFeedback) => {
      console.log('Received feedback:', data);

      if (data.chatId === chatId) {
        setLatestFeedback(data);
        setFeedbacks((prev) => [...prev, data]);
        toast.info(`Received feedback for your video`);
      }
    },
    [chatId],
  );

  // Use a ref to track if we've already subscribed
  const hasSubscribedRef = useRef(false);

  useEffect(() => {
    if (!isConnected || hasSubscribedRef.current) return;

    // Mark as subscribed
    hasSubscribedRef.current = true;

    // Listen for feedback events

    on('FEEDBACK', handleFeedback);

    return () => {
      console.log('Unsubscribing useVideoFeedback');
      off('FEEDBACK');
      hasSubscribedRef.current = false;
    };
  }, [chatId, isConnected, on, off, handleFeedback]);

  return { feedbacks, latestFeedback };
}
