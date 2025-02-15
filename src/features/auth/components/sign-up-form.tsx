import AuthFormWrapper from '@/components/form/AuthFormWrapper';
import { Google } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { appConfig } from '@/config/app';
import { useSignUpForm } from '@/features/hooks/use-sign-up-form';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useSignUpForm();

  const onSubmit = (values: z.infer<typeof schema>) => {};

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <AuthFormWrapper title='Create an account' description={`Sign up for a ${appConfig.appName} account`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex flex-col gap-4'>
              <Button variant='outline' className='w-full'>
                <Google />
                Sign up with Google
              </Button>
            </div>
            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
              <span className='relative z-10 bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoFocus {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <PasswordInput {...field} />
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
            <Button type='submit' className='w-full'>
              Sign up
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{' '}
              <Link to='/login' className='underline underline-offset-4'>
                Login
              </Link>
            </div>
          </form>
        </Form>
      </AuthFormWrapper>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
