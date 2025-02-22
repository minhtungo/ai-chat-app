import { appConfig } from '@/config/app';
import { ChatInput } from '@/features/chat/components/chat-input';
import { useChatActions } from '@/store/chat';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatPanelProps = React.ComponentProps<'div'>;

export function ChatPanel({ className, ...props }: ChatPanelProps) {
  const { addMessage } = useChatActions();

  const handleSendMessage = (message: string, attachments: Attachment[]) => {
    addMessage({
      id: crypto.randomUUID(),
      content: message,
      role: 'user',
      createdAt: new Date(),
      attachments,
    });
  };

  return (
    <div className={cn('group m-auto w-full', className)} {...props}>
      <div className='bg-background relative z-10 mx-auto flex flex-1 flex-col xl:max-w-5xl'>
        <ChatInput onSend={handleSendMessage} />
        <p className='text-muted-foreground py-2 text-center text-xs'>
          {appConfig.appName} Tutor can make mistakes. Consider checking
          important information.
        </p>
      </div>
    </div>
  );
}
