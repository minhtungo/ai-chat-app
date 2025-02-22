import TextHighlighter from '@/components/common/text-highlighter';
import { ChatMessage } from '@/features/chat/components/chat-message';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

interface ChatHistoryProps extends React.ComponentProps<'div'> {
  messages?: ChatMessageType[];
}

const mockMessages: ChatMessageType[] = [
  {
    id: '1',
    content: 'Hello, how are you?',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '2',
    content: 'I am fine, thank you!',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '3',
    content: 'What is the weather in Tokyo?',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '4',
    content:
      'TLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '5',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '6',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '7',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '8',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '9',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '10',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '11',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '12',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '13',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '14',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '15',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '16',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
  {
    id: '17',
    content: 'The weather in Tokyo is sunny.',
    role: 'user',
    createdAt: new Date(),
  },
  {
    id: '18',
    content: 'The weather in Tokyo is sunny.',
    role: 'assistant',
    createdAt: new Date(),
  },
];

export function ChatHistory({
  messages = mockMessages,
  className,
  ...props
}: ChatHistoryProps) {
  return (
    <TextHighlighter>
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col overflow-auto px-4 pb-12',
          className,
        )}
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
        {...props}
      >
        {messages.length > 0 && (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={message.id === messages[messages.length - 1].id}
              />
            ))}
          </>
        )}
      </div>
    </TextHighlighter>
  );
}
