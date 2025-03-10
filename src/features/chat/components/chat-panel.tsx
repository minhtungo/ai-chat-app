import { streamChatCompletion } from '@/features/chat/api/chat-completion';
import { ChatInput } from '@/features/chat/components/chat-input';
import { useChatMessageActions } from '@/store/chat-store';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

type ChatPanelProps = React.ComponentProps<'div'>;

export function ChatPanel({ className, ...props }: ChatPanelProps) {
  const { addMessage, updateLastMessage } = useChatMessageActions();
  const [isStreaming, setIsStreaming] = useState(false);

  const debouncedUpdate = useCallback(
    debounce((content: string) => {
      updateLastMessage(content);
    }, 50),
    [],
  );

  const handleSendMessage = async (
    message: string,
    attachments: Attachment[],
  ) => {
    addMessage({
      id: crypto.randomUUID(),
      content: message,
      role: 'user',
      createdAt: new Date(),
      attachments,
    });

    const assistantMessageId = crypto.randomUUID();
    addMessage({
      id: assistantMessageId,
      content: '',
      role: 'assistant',
      createdAt: new Date(),
      attachments: [],
    });

    setIsStreaming(true);

    let accumulatedResponse = '';

    try {
      await streamChatCompletion(
        message,
        (chunk) => {
          accumulatedResponse += chunk;
          debouncedUpdate(accumulatedResponse);
        },
        () => {
          setIsStreaming(false);
        },
      );
    } catch (error) {
      console.error('Chat completion error:', error);
      updateLastMessage('Sorry, there was an error processing your request.');
      setIsStreaming(false);
    }
  };

  return (
    <div className={cn('group m-auto w-full', className)} {...props}>
      <div className='bg-background relative z-10 mx-auto flex flex-1 flex-col pb-3 xl:max-w-5xl'>
        <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
}
