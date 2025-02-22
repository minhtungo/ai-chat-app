import logo from '@/assets/logo.webp';
import { cn } from '@/utils/cn';

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <img
      src={logo}
      alt='logo'
      className={cn('size-10 object-contain', className)}
      {...props}
    />
  );
}
