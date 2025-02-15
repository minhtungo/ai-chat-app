import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function PasswordInput(props: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative w-full'>
      <Input className='pr-12' {...props} type={showPassword ? 'text' : 'password'} />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='text-muted-foreground focus:text-muted-foreground focus-visible:ring-ring absolute right-0 top-1/2 mr-3 -translate-y-1/2 outline-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 cursor-pointer'
        arial-label='Show password'
      >
        {showPassword ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
      </button>
    </div>
  );
}
