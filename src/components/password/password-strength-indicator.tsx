import { cn } from '@/utils/cn';
import { getPasswordStrengthColor } from '@/utils/password';

type PasswordStrengthIndicatorProps = React.ComponentProps<'div'> & {
  strengthScore: number;
};

export function PasswordStrengthIndicator({
  strengthScore,
  className,
  ...props
}: PasswordStrengthIndicatorProps) {
  return (
    <div
      className={cn(
        'bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full',
        className,
      )}
      role='progressbar'
      aria-valuenow={strengthScore}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label='Password strength'
      {...props}
    >
      <div
        className={`h-full ${getPasswordStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
        style={{ width: `${(strengthScore / 4) * 100}%` }}
      />
    </div>
  );
}
