import { Facebook, Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { handleOAuthLogin } from '@/lib/oauth';
import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';

export function OAuthActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('grid gap-2 sm:grid-cols-2', className)} {...props}>
      <Button
        onClick={() => handleOAuthLogin('facebook')}
        variant='outline'
        type='button'
        className='w-full'
      >
        <Facebook className='size-5' />
        Facebook
        <span className='sr-only'>Sign in with Facebook</span>
      </Button>
      <Button
        onClick={() => handleOAuthLogin('google')}
        variant='outline'
        type='button'
        className='w-full'
      >
        <Google />
        Google
        <span className='sr-only'>Sign in with Google</span>
      </Button>
    </div>
  );
}
