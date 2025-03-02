import { AuthActions } from '@/components/common/auth-actions';
import { Share2 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useUser } from '@/features/user/api/get-user';
import { useChatName } from '@/store/chat-store';
import { cn } from '@/utils/cn';

type ChatHeaderProps = React.ComponentProps<'div'>;

export function ChatHeader({ className, ...props }: ChatHeaderProps) {
  const { data: user } = useUser();
  const chatName = useChatName();

  return (
    <div
      className={cn(
        'border-sidebar-border flex w-full items-center gap-x-2 border-b',
        className,
      )}
      {...props}
    >
      <h1 className='text-base font-medium'>{chatName || 'New Chat'}</h1>
      <div className='ml-auto flex items-center gap-x-3'>
        {user ? <ChatHeaderActions /> : <AuthActions />}
      </div>
    </div>
  );
}

function ChatHeaderActions() {
  return (
    <div className='flex items-center gap-2'>
      <TooltipButton tooltip='Share'>
        <Button variant='ghost' size='icon'>
          <Share2 className='size-5' />
        </Button>
      </TooltipButton>
    </div>
  );
}
