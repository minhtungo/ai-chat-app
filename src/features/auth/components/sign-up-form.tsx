import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
import FormResponse from '@/components/form/FormResponse';
import { PasswordInput } from '@/components/password/password-input';
import { PasswordInputStrength } from '@/components/password/password-input-strength';
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
import { appRoutes } from '@/config/routes';
import { useSignUpMutation } from '@/features/auth/api/sign-up';
import { OAuthActions } from '@/features/auth/components/oauth-actions';
import { useSignUpForm } from '@/features/auth/hooks/use-sign-up-form';
import { handleError } from '@/lib/errors';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useSignUpForm();

  const {
    mutate: signUp,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSignUpMutation();

  const onSubmit = (data: z.infer<typeof schema>) => {
    signUp(data);
  };

  return (
    <div className={cn('w-full space-y-6', className)} {...props}>
      <AuthFormWrapper
        title='Create your account'
        description={`Welcome! Please fill in the details to get started.`}
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
                      <Input {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInputStrength {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isSuccess && (
              <FormResponse
                title='Success'
                variant='success'
                description='If the email you provided is not already in use, you will receive a verification email. The verification link expires in 10 minutes.'
              />
            )}
            {isError && (
              <FormResponse
                title='Error'
                variant='destructive'
                description={handleError(
                  error,
                  'Invalid email or password. Please try again.',
                )}
              />
            )}
            <LoaderButton isPending={isPending} className='w-full'>
              Sign Up
            </LoaderButton>
            <div className='text-center text-sm'>
              Already have an account?{' '}
              <Link
                to={appRoutes.auth.signIn.path}
                className='underline underline-offset-4'
              >
                Sign In
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
