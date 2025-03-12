import { Textarea } from '@/components/ui/textarea';
import { ChatInputActions } from '@/features/chat/components/chat-input/chat-input-actions';
import { ChatInputAttachment } from '@/features/chat/components/chat-input/chat-input-attachment';
import { ChatSubmitButton } from '@/features/chat/components/chat-input/chat-submit-button';
import { useMessages } from '@/features/chat/hooks/use-messages';

type ChatInputProps = React.ComponentProps<'div'> & {};

export function ChatInput({}: ChatInputProps) {
  const {
    message,
    setMessage,
    attachments,
    sendMessage,
    handleFileChange,
    handleRemoveAttachment,
  } = useMessages();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message, attachments);
      }}
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
            sendMessage(message, attachments);
          }
        }}
        placeholder='Type a message...'
        className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
        autoFocus
      />
      <div className='flex items-center justify-between'>
        <ChatInputActions onFileChange={handleFileChange} />
        <div>
          <ChatSubmitButton
            disabled={!message.trim() && attachments.length === 0}
          />
        </div>
      </div>
    </form>
  );
}
