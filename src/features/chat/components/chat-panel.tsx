import { ChatInput } from '@/features/chat/components/chat-input';
import { cn } from '@/utils/cn';

type ChatPanelProps = React.ComponentProps<'div'>;

export function ChatPanel({ className, ...props }: ChatPanelProps) {
  return (
    <div className={cn('group m-auto w-full', className)} {...props}>
      <div className='bg-background relative z-10 mx-auto flex flex-1 flex-col pb-3 xl:max-w-5xl'>
        <ChatInput />
      </div>
    </div>
  );
}
