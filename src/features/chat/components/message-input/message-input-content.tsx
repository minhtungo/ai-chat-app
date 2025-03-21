import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import {
  useMessageInputStore,
  useMessageInputStoreActions,
} from '@/features/chat/store/message-input-store';
import { adjustMessageInputHeight } from '@/utils/message-input';
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
  const { setMessage, submitMessage } = useMessageInputStoreActions();

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
      value={currentMessage}
      ref={textareaRef}
      onChange={(e) => {
        setMessage(e.target.value);
        adjustMessageInputHeight(textareaRef.current);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.style.height = '';
          submitMessage();
        }
      }}
      placeholder='Type a message...'
      className='h-full max-h-[200px] min-h-8 w-full resize-none border-none p-0 text-base focus-visible:ring-0 focus-visible:outline-none'
      autoFocus
    />
  );
}
