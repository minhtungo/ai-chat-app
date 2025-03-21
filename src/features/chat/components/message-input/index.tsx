import { FileUploadButton } from '@/features/chat/components/chat-panel/file-upload-button';
import { FileUploadModal } from '@/features/chat/components/chat-panel/file-upload-modal';
import { MathExpressions } from '@/features/chat/components/chat-panel/math-expressions';
import { MathModeToggleButton } from '@/features/chat/components/chat-panel/math-mode-toggle-button';
import { AiModeToggle } from '@/features/chat/components/message-input/ai-mode-toggle';
import { MessageInputActions } from '@/features/chat/components/message-input/message-input-actions';
import { MessageInputAttachments } from '@/features/chat/components/message-input/message-input-attachments';
import { MessageInputContent } from '@/features/chat/components/message-input/message-input-content';
import { MessageSubmitButton } from '@/features/chat/components/message-input/message-submit-button';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useRef } from 'react';

type MessageInputProps = {};

export function MessageInput({}: MessageInputProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const submitMessage = useMessageInputStore(
    (state) => state.actions.submitMessage,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className='border-accent bg-accent/50 focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-2xl border p-3'
    >
      <MessageInputAttachments />
      <MessageInputContent />
      <MathExpressions />
      <div className='flex items-center justify-between'>
        <AiModeToggle className='-ml-[5px]' />
        <div className='flex items-center gap-x-2'>
          <MathModeToggleButton />
          <FileUploadButton />
          <MessageSubmitButton />
        </div>
      </div>
    </form>
  );
}
