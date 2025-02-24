import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
import FormResponse from '@/components/form/FormResponse';
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
import { useForgotPassword } from '@/features/auth/api/forgot-password';
import { useForgotPasswordForm } from '@/features/auth/hooks/use-forgot-password';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useForgotPasswordForm();
  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    isError,
  } = useForgotPassword();

  const onSubmit = (data: z.infer<typeof schema>) => {
    forgotPassword(data.email);
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
            {isSuccess && (
              <FormResponse
                title='Success'
                variant='success'
                description='If you signed up using your email and password, you will receive a password reset email. The password reset link expires in 10 minutes.'
              />
            )}
            {isError && (
              <FormResponse
                title='Error'
                variant='destructive'
                description='Something went wrong. Please try again later.'
              />
            )}
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
