import ChatMessage from '@/features/chat/components/chat-message';
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
    content: 'The weather in Tokyo is sunny.',
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

export default function ChatHistory({
  messages = mockMessages,
  className,
  ...props
}: ChatHistoryProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-4',
        className,
      )}
      {...props}
    >
      {messages.length > 0 && (
        <div className='space-y-4'>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
