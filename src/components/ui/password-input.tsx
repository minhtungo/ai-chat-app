import { Eye, EyeOff } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import { useState } from 'react';

type PasswordInputProps = React.ComponentProps<'div'> & {
  showEyeIcon?: boolean;
};

export function PasswordInput({
  showEyeIcon = true,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn('relative', className)} {...props}>
      <Input className='pr-12' type={showPassword ? 'text' : 'password'} />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='text-muted-foreground focus:text-muted-foreground focus-visible:ring-ring absolute top-1/2 right-0 mr-3 -translate-y-1/2 cursor-pointer transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:outline-none'
        arial-label='Show password'
      >
        {showPassword ? (
          <Eye className='h-4 w-4' />
        ) : (
          <EyeOff className='h-4 w-4' />
        )}
      </button>
    </div>
  );
}
