import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { chatMessageActions } from '@/features/chat/lib/actions';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatMessageProps = React.ComponentProps<'div'> & {
  message: ChatMessageType;
  isLatest: boolean;
};

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  return (
    <article className='group w-full pt-3.5 pb-3 md:py-5'>
      <div className='relative mx-auto w-full xl:max-w-5xl'>
        <div className='flex flex-col gap-1 md:gap-3'>
          <div
            className={cn(
              message.role === 'user'
                ? 'ml-auto w-max md:max-w-[75%]'
                : 'md:mb-2',
            )}
          >
            <ChatMessageContent message={message} />
            <div className='empty:hidden md:absolute'>
              {message.role === 'assistant' && (
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

function ChatMessageContent({ message }: { message: ChatMessageType }) {
  return (
    <div
      className={cn(
        message.role === 'user'
          ? 'bg-muted rounded-lg px-3 py-2 md:px-4 md:py-3'
          : 'bg-transparent',
      )}
    >
      <div className='prose prose-sm text-base leading-7 break-words'>
        {message.content}
      </div>
    </div>
  );
}

type ChatMessageActionsProps = React.ComponentProps<'div'> & {
  messageId: string;
  isLatest: boolean;
};

function ChatMessageActions({
  className,
  messageId,

  isLatest,
  ...props
}: ChatMessageActionsProps) {
  return (
    <div
      className={cn(
        'mt-2 flex items-center gap-1',
        !isLatest &&
          'md:opacity-0 md:transition-opacity md:duration-200 md:ease-in-out md:group-hover:opacity-100',
        className,
      )}
      {...props}
    >
      {chatMessageActions.map((action) => (
        <TooltipButton
          key={`${action.tooltip}-${messageId}-action`}
          tooltip={action.tooltip}
          side='bottom'
        >
          <Button variant='ghost' size='icon' className='size-6'>
            <action.icon className='size-3.5' />
          </Button>
        </TooltipButton>
      ))}
    </div>
  );
}
