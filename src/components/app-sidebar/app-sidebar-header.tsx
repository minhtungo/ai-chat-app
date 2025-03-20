import { Logo } from '@/components/common/logo';
import { env } from '@/config/env';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function AppSidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn(className)} {...props}>
      <Link to={env.WEBSITE_URL} target='_blank'>
        <Logo />
      </Link>
    </div>
  );
}
