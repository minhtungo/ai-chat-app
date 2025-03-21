import { AuthActions } from '@/components/common/auth-actions';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { appConfig } from '@/config/app-config';
import { appRoutes } from '@/config/routes';
import { useUser } from '@/features/user/api/get-user';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function PublicHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  const { data: user } = useUser();
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50', className)} {...props}>
      <div className='bg-background/80 border-border/30 relative border-b shadow-sm backdrop-blur-sm'>
        <div className='container flex h-14 items-center justify-between'>
          <div className='flex w-2/12 items-center gap-2'>
            <Link
              to={appRoutes.public.home.path}
              className='flex items-center gap-3'
            >
              <span className='text-foreground text-lg font-medium'>Lumi</span>
            </Link>
          </div>
          <nav className='hidden items-center gap-4 md:flex'>
            {appConfig.menu.header.map((navigation) => (
              <Link
                to={navigation.path}
                key={navigation.path}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                {navigation.name}
              </Link>
            ))}
          </nav>
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            {user ? (
              <Link
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  }),
                )}
                to={appRoutes.app.chat.path}
              >
                Dashboard
              </Link>
            ) : (
              <AuthActions />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
