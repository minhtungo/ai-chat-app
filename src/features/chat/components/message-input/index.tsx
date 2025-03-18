import { MathExpressions } from '@/features/chat/components/message-input/math-expressions';
import { MessageInputActions } from '@/features/chat/components/message-input/message-input-actions';
import { MessageInputAttachments } from '@/features/chat/components/message-input/message-input-attachments';
import { MessageInputContent } from '@/features/chat/components/message-input/message-input-content';
import { MessageSubmitButton } from '@/features/chat/components/message-input/message-submit-button';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useRef } from 'react';

type MessageInputProps = {};

export function MessageInput({}: MessageInputProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const sendMessage = useMessageInputStore(
    (state) => state.actions.sendMessage,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      <MessageInputAttachments />
      <MessageInputContent />
      <MathExpressions />
      <div className='flex items-center justify-between'>
        <MessageInputActions />
        <div>
          <MessageSubmitButton />
        </div>
      </div>
    </form>
  );
}
