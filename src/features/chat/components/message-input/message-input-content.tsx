import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useRouterState } from '@tanstack/react-router';
import { Suspense, lazy, useEffect, useRef } from 'react';

const MathKeyboard = lazy(
  () => import('@/features/chat/components/chat-panel/math-keyboard'),
);

export function MessageInputContent() {
  const isMathKeyboardOpen = useMessageInputStore(
    (state) => state.state.isMathKeyboardOpen,
  );
  const currentMessage = useMessageInputStore((state) => state.state.message);

  const setCurrentMessage = useMessageInputStore(
    (state) => state.actions.setMessage,
  );
  const submitMessage = useMessageInputStore(
    (state) => state.actions.submitMessage,
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { location } = useRouterState();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [location.pathname]);

  if (isMathKeyboardOpen) {
    return (
      <Suspense fallback={<Spinner />}>
        <MathKeyboard />
      </Suspense>
    );
  }

  return (
    <Textarea
      ref={textareaRef}
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.style.height = '';
          submitMessage();
        }
      }}
      placeholder='Type a message...'
      className='max-h-[200px] min-h-9 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
      autoFocus
    />
  );
}
