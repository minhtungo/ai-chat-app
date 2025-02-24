import { cn } from '@/utils/cn';

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <span className={cn('font-semibold', className)} {...props}>
      Lumi
    </span>
  );
}
