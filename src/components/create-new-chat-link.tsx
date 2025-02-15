import { buttonVariants } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { MessageSquarePlus } from 'lucide-react';

export function CreateNewChatLink({ className, ...props }: React.ComponentProps<'a'>) {
  return (
    <Link
      to={paths.app.chat.path}
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
