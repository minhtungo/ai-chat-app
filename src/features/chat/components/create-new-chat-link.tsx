import { MessageSquarePlus } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function CreateNewChatLink({
  className,
  ...props
}: React.ComponentProps<'a'>) {
  return (
    <Link
      to={appRoutes.app.chat.path}
      className={cn(
        buttonVariants({
          size: 'icon',
          variant: 'ghost',
        }),
        className,
      )}
      {...props}
    >
      <MessageSquarePlus className='size-5' />
    </Link>
  );
}
