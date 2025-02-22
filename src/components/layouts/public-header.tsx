import { AuthActions } from '@/components/common/auth-actions';
import { buttonVariants } from '@/components/ui/button';
import { publicNavigations } from '@/config/navigations';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function PublicHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50', className)} {...props}>
      <div className='bg-background/80 relative shadow-sm backdrop-blur-sm'>
        <div className='container flex h-14 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link to={appRoutes.home.path} className='flex items-center gap-3'>
              <span className='text-foreground text-lg font-medium'>Lumi</span>
            </Link>
          </div>
          <nav className='hidden items-center gap-4 md:flex'>
            {publicNavigations.header.map((navigation) => (
              <Link
                to={navigation.path}
                key={navigation.path}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                {navigation.name}
              </Link>
            ))}
          </nav>
          <AuthActions />
        </div>
      </div>
    </header>
  );
}
