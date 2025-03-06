import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
import FormResponse from '@/components/form/FormResponse';
import { PasswordInput } from '@/components/password/password-input';
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
import { appConfig } from '@/config/app';
import { appRoutes } from '@/config/routes';
import { useSignIn } from '@/features/auth/api/sign-in';
import { OAuthActions } from '@/features/auth/components/oauth-actions';
import { useSignInForm } from '@/features/auth/hooks/use-sign-in-form';
import { handleError } from '@/lib/errors';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useSignInForm();
  const { mutate: signIn, isPending, isError, error } = useSignIn();

  const onSubmit = (data: z.infer<typeof schema>) => {
    signIn(data);
  };

  return (
    <div className={cn('space-y-6', className)} {...props}>
      <AuthFormWrapper
        title={`Sign in to ${appConfig.appName}`}
        description='Welcome back! Please sign in to continue'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <OAuthActions />
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
                        to={appRoutes.auth.forgotPassword.path}
                        className='text-muted-foreground inline-block text-sm underline-offset-4 hover:underline'
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isError && (
              <FormResponse
                title='Failed to sign in'
                variant='destructive'
                description={handleError(
                  error,
                  'Invalid email or password. Please try again.',
                )}
              />
            )}
            <LoaderButton isPending={isPending} className='w-full'>
              Sign In
            </LoaderButton>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link
                to={appRoutes.auth.signUp.path}
                className='underline underline-offset-4'
              >
                Sign Up
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
