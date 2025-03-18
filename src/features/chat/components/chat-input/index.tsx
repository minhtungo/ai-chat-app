import { X } from '@/components/icons';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ChatInputActions } from '@/features/chat/components/chat-input/chat-input-actions';
import { ChatInputAttachment } from '@/features/chat/components/chat-input/chat-input-attachment';
import { ChatSubmitButton } from '@/features/chat/components/chat-input/chat-submit-button';
import { MathPreview } from '@/features/chat/components/chat-input/math-preview';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { Suspense, lazy } from 'react';

type ChatInputProps = {};

const MathKeyboard = lazy(
  () => import('@/features/chat/components/chat-input/math-keyboard'),
);

export function ChatInput({}: ChatInputProps) {
  const sendMessage = useMessageInputStore(
    (state) => state.actions.sendMessage,
  );

  const attachments = useMessageInputStore((state) => state.state.attachments);
  const isMathKeyboardOpen = useMessageInputStore(
    (state) => state.state.isMathKeyboardOpen,
  );

  const setCurrentMessage = useMessageInputStore(
    (state) => state.actions.setMessage,
  );
  const currentMessage = useMessageInputStore((state) => state.state.message);

  const mathExpressions = useMessageInputStore(
    (state) => state.state.mathExpressions,
  );
  const handleRemoveMath = useMessageInputStore(
    (state) => state.actions.removeMathExpression,
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      {attachments.length > 0 && (
        <div className='mb-1 flex gap-2 overflow-auto pt-1'>
          {attachments.map((attachment) => (
            <div key={`chat-input-attachment-${attachment.id}`}>
              <ChatInputAttachment attachment={attachment} />
            </div>
          ))}
        </div>
      )}

      {isMathKeyboardOpen ? (
        <Suspense fallback={<Spinner />}>
          <MathKeyboard />
        </Suspense>
      ) : (
        <>
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.style.height = '';
                sendMessage();
              }
            }}
            placeholder='Type a message...'
            className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
            autoFocus
          />

          {mathExpressions.length > 0 && (
            <div className='mt-2 mb-1 space-y-1'>
              {mathExpressions.map((expr, index) => (
                <div
                  key={`math-expr-${index}`}
                  className='bg-muted relative rounded p-1 pr-8'
                >
                  <MathPreview content={expr} />
                  <button
                    type='button'
                    onClick={() => handleRemoveMath(index)}
                    className='text-muted-foreground hover:text-foreground absolute top-1 right-1 rounded-full p-1'
                  >
                    <X className='size-4' />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='flex items-center justify-between'>
            <ChatInputActions />
            <div>
              <ChatSubmitButton
                disabled={
                  !currentMessage.trim() &&
                  mathExpressions.length === 0 &&
                  attachments.length === 0
                }
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
