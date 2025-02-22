import { Button } from '@/components/ui/button';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function AuthActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
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
    </div>
  );
}
