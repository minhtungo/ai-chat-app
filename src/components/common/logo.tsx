import { cn } from '@/utils/cn';

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <div className={cn('font-semibold', className)} {...props}>
      Lumi
    </div>
  );
}
