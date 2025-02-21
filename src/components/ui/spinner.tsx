import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2Icon } from '@/components/icons';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-3 w-3',
      md: 'size-8',
      lg: 'size-12',
      xl: 'size-16',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants>, React.ComponentProps<'svg'> {}

const Spinner = ({ className, size }: SpinnerProps) => {
  return <Loader2Icon className={cn(spinnerVariants({ size, className }))} />;
};

Spinner.displayName = 'Spinner';

export { Spinner };
