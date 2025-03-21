import { MessageInput } from '@/features/chat/components/message-input';
import { MessageInputProvider } from '@/features/chat/store/message-input-store';
import { cn } from '@/utils/cn';

type ChatPanelProps = React.ComponentProps<'div'>;

export function ChatPanel({ className, ...props }: ChatPanelProps) {
  return (
    <div className={cn('group m-auto mb-2 w-full', className)} {...props}>
      <div className='bg-background relative z-10 mx-auto flex flex-1 flex-col xl:max-w-4xl'>
        <MessageInputProvider>
          <MessageInput />
        </MessageInputProvider>
      </div>
    </div>
  );
}
