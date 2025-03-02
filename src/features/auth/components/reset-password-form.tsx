import { AuthFormWrapper } from '@/components/form/AuthFormWrapper';
import FormResponse from '@/components/form/FormResponse';
import { PasswordInput } from '@/components/password/password-input';
import { buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoaderButton } from '@/components/ui/loader-button';
import { appRoutes } from '@/config/routes';
import { useResetPassword } from '@/features/auth/api/reset-password';
import { useResetPasswordForm } from '@/features/auth/hooks/use-reset-password-form';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useResetPasswordForm();
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    isError,
  } = useResetPassword();

  const onSubmit = (data: z.infer<typeof schema>) => {
    resetPassword(data);
  };

  return (
    <div className={cn('space-y-6', className)} {...props}>
      <AuthFormWrapper
        title='Reset Your Password'
        description={`Type in a new secure password and click Save to update your password.`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput autoFocus {...field} />
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
            {isSuccess && (
              <>
                <FormResponse
                  title='Success'
                  variant='success'
                  description='Your password has been reset successfully.'
                />
                <Link
                  to={appRoutes.auth.signIn.path}
                  className={buttonVariants({ variant: 'default' })}
                >
                  Sign In
                </Link>
              </>
            )}
            {isError && (
              <FormResponse
                title='Error'
                variant='destructive'
                description='Something went wrong. Please try again later.'
              />
            )}
            <LoaderButton isPending={isPending} className='w-full'>
              Save New Password
            </LoaderButton>
          </form>
        </Form>
      </AuthFormWrapper>
    </div>
  );
}
