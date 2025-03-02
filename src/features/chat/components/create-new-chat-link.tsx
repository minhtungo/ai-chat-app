import { SquarePen } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function CreateNewChatLink({
  className,
  ...props
}: React.ComponentProps<'a'>) {
  return (
    <TooltipButton tooltip='New chat'>
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
        <SquarePen className='size-5' />
      </Link>
    </TooltipButton>
  );
}
