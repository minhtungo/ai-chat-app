import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { chatMessageActions } from '@/features/chat/lib/constants';
import { cn } from '@/utils/cn';

type ChatMessageActionsProps = React.ComponentProps<'div'> & {
  messageId: string;
  isLatest: boolean;
};

export function ChatMessageActions({
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
          tabIndex={-1}
        >
          <Button variant='ghost' size='icon' className='size-6'>
            <action.icon className='size-3.5' />
          </Button>
        </TooltipButton>
      ))}
    </div>
  );
}
