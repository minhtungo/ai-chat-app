import { ChatMessageActions } from '@/features/chat/components/chat-message/chat-message-actions';
import { ChatMessageAttachment } from '@/features/chat/components/chat-message/chat-message-attachment';
import { ChatMessageContent } from '@/features/chat/components/chat-message/chat-message-content';
import { useChatStoreIsStreaming } from '@/store/chat-store';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

export type ChatMessageProps = React.ComponentProps<'div'> & {
  message: ChatMessageType;
  isLatest: boolean;
};

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isStreaming = isLatest ? useChatStoreIsStreaming() : false;

  return (
    <article className='group w-full pt-3.5 pb-3 md:py-5'>
      <div className='relative mx-auto w-full xl:max-w-5xl'>
        <div className='flex flex-col gap-1 md:gap-3'>
          <div
            className={cn(
              message.role === 'user'
                ? 'ml-auto w-fit md:max-w-[75%]'
                : 'md:mb-2',
            )}
          >
            {message.attachments.length > 0 &&
              message.attachments.map((attachment, index) => (
                <div
                  className='mb-3 flex flex-col items-end gap-1'
                  key={`chat-message-attachment-${attachment.id}-${index}`}
                >
                  <ChatMessageAttachment attachment={attachment} />
                </div>
              ))}
            <ChatMessageContent
              message={message}
              isStreaming={isLatest && isStreaming}
            />

            <div className='empty:hidden md:absolute'>
              {message.role === 'assistant' && !isStreaming && (
                <ChatMessageActions
                  messageId={message.id}
                  isLatest={isLatest}
                  role={message.role}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
