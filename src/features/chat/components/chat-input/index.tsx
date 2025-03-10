import { ArrowUp, Loader2 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatInputActions } from '@/features/chat/components/chat-input/chat-input-actions';
import { ChatInputAttachment } from '@/features/chat/components/chat-input/chat-input-attachment';
import { useChatInput } from '@/features/chat/hooks/use-chat-input';
import type { Attachment } from '@/types/chat';

type ChatInputProps = React.ComponentProps<'div'> & {
  onSend: (message: string, files: Attachment[]) => void;
};

export function ChatInput({
  onSend,
  disabled,
}: ChatInputProps & { disabled?: boolean }) {
  const {
    message,
    setMessage,
    attachments,
    handleSubmit,
    handleFileChange,
    handleRemoveAttachment,
  } = useChatInput(onSend);

  return (
    <form
      onSubmit={handleSubmit}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      {attachments.length > 0 && (
        <div className='mb-1 flex gap-2 overflow-auto pt-1'>
          {attachments.map((attachment) => (
            <div key={`chat-input-attachment-${attachment.id}`}>
              <ChatInputAttachment
                attachment={attachment}
                onRemoveAttachment={handleRemoveAttachment}
              />
            </div>
          ))}
        </div>
      )}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.style.height = '';
            handleSubmit(e);
          }
        }}
        placeholder='Type a message...'
        className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
        autoFocus
        disabled={disabled}
      />
      <div className='flex items-center justify-between'>
        <ChatInputActions onFileChange={handleFileChange} />
        <div>
          <Button
            type='submit'
            className='size-8 rounded-full'
            size='icon'
            disabled={disabled || (!message.trim() && attachments.length === 0)}
          >
            {disabled ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <ArrowUp />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
