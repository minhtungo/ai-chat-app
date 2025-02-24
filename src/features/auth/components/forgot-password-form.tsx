import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
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
import { appConfig } from '@/config/app';
import { appRoutes } from '@/config/routes';
import { useSignIn } from '@/features/auth/api/sign-in';
import { OAuthActions } from '@/features/auth/components/oauth-actions';
import { useSignInForm } from '@/features/auth/hooks/use-sign-in-form';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useSignInForm();
  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: z.infer<typeof schema>) => {
    signIn(data);
  };
  return (
    <div className={cn('space-y-6', className)} {...props}>
      <AuthFormWrapper
        title='Reset Your Password'
        description={`Type in your email and we'll send you a link to reset your password`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
            <LoaderButton isPending={isPending} className='w-full'>
              Send Reset Email
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
    </div>
  );
}
