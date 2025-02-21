import { useLogin } from '@/api/auth/login';
import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
import { Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/ui/loader-button';
import { PasswordInput } from '@/components/ui/password-input';
import { useLogInForm } from '@/features/auth/hooks/use-log-in-form';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useLogInForm();
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: z.infer<typeof schema>) => {
    login(data);
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <AuthFormWrapper
        title='Welcome back'
        description='Login with your Google account'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex flex-col gap-4'>
              <Button variant='outline' type='button' className='w-full'>
                <Google />
                Login with Google
              </Button>
            </div>
            <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
              <span className='bg-background text-muted-foreground relative z-10 px-2'>
                Or continue with
              </span>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        type='email'
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        to='/'
                        className='inline-block text-sm underline-offset-4 hover:underline'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        autoComplete='current-password password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <LoaderButton isPending={isPending} className='w-full'>
              Login
            </LoaderButton>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/signup' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </AuthFormWrapper>
      <div className='text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
