import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/ui/loader-button';
import { PasswordInput } from '@/components/ui/password-input';
import { useChangePassword } from '@/features/user/api/change-password';
import { SettingFormItem } from '@/features/user/components/setting-form-item';
import { useChangePasswordForm } from '@/features/user/hooks/use-change-password';
import { cn } from '@/utils/cn';
import { z } from 'zod';

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useChangePasswordForm();
  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data: z.infer<typeof schema>) => {
    changePassword(data);
  };

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <div className='py-4'>
        <h2 className='text-xl font-semibold'>Change Password</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <SettingFormItem label='Current Password'>
                <PasswordInput {...field} />
              </SettingFormItem>
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <SettingFormItem label='New Password'>
                <PasswordInput {...field} />
              </SettingFormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmNewPassword'
            render={({ field }) => (
              <SettingFormItem label='Confirm New Password'>
                <PasswordInput {...field} />
              </SettingFormItem>
            )}
          />
          <div className='mt-3 flex w-full justify-end'>
            <LoaderButton isPending={isPending}>Change Password</LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
