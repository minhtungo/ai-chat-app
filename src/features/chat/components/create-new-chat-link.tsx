import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { MessageSquarePlus } from '@/components/icons';
import { appRoutes } from '@/config/routes';

export function CreateNewChatLink({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <Link
      to={appRoutes.app.chat.path}
      className={cn(
        buttonVariants({
          size: 'icon',
          variant: 'ghost',
        }),
        className
      )}
      {...props}
    >
      <MessageSquarePlus className='size-5' />
    </Link>
  );
}
