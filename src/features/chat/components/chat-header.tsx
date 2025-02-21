import { useUser } from '@/api/user/get-user';
import { AuthActions } from '@/components/common/auth-actions';
import { Share2 } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';

interface ChatHeaderProps extends React.ComponentProps<'div'> {}

export function ChatHeader({ className, ...props }: ChatHeaderProps) {
  const { data: user } = useUser();

  return (
    <div
      className={cn(
        'border-border flex w-full items-center justify-between gap-x-2 border-b',
        className,
      )}
      {...props}
    >
      <SidebarTrigger />
      {!user && <AuthActions />}
      <ChatHeaderActions />
    </div>
  );
}

function ChatHeaderActions() {
  return (
    <div className='flex items-center gap-2'>
      <Button variant='ghost' size='icon'>
        <Share2 className='size-5' />
      </Button>
    </div>
  );
}
