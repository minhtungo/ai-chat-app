import { Loader2Icon } from '@/components/icons';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'size-3',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SpinnerProps
  extends VariantProps<typeof spinnerVariants>,
    React.ComponentProps<'svg'> {}

const Spinner = ({ className, size }: SpinnerProps) => {
  return <Loader2Icon className={cn(spinnerVariants({ size, className }))} />;
};

Spinner.displayName = 'Spinner';

export { Spinner };
