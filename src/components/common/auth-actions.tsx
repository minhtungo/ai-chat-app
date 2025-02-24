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
          to={appRoutes.auth.signIn.path}
          className={cn('text-muted-foreground text-sm', className)}
        >
          Sign In
        </Link>
      </Button>
      <Button variant='outline' size='sm' asChild>
        <Link
          to={appRoutes.auth.signUp.path}
          className={cn('text-muted-foreground text-sm', className)}
        >
          Sign Up
        </Link>
      </Button>
    </div>
  );
}
