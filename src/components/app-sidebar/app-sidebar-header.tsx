import { Logo } from '@/components/common/logo';
import { appRoutes } from '@/config/routes';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function AppSidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn(className)} {...props}>
      <Link to={appRoutes.home.path}>
        <Logo />
      </Link>
    </div>
  );
}
