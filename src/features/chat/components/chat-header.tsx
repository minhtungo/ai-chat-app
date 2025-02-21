import { useUser } from '@/api/user/get-user';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

interface ChatHeaderProps extends React.ComponentProps<'div'> {}

export function ChatHeader({ className, ...props }: ChatHeaderProps) {
  const { data: user } = useUser();

  return (
    <div
      className={cn(
        'border-border flex w-full items-center justify-between border-b',
        className,
      )}
      {...props}
    >
      <SidebarTrigger />
      <div className='flex items-center gap-2'>
        {!user && (
          <>
            <Button size='sm' asChild>
              <Link
                to={appRoutes.auth.login.path}
                className={cn('text-muted-foreground text-sm', className)}
              >
                Login
              </Link>
            </Button>
            <Button variant='outline' size='sm' asChild>
              <Link
                to={appRoutes.auth.signup.path}
                className={cn('text-muted-foreground text-sm', className)}
              >
                Sign Up
              </Link>
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
