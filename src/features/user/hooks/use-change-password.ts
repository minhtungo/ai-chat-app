import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const changePasswordInputSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(1, 'New password is required'),
  confirmNewPassword: z.string().min(1, 'Confirm password is required'),
});

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export function useChangePasswordForm() {
  const form = useForm<z.infer<typeof changePasswordInputSchema>>({
    resolver: zodResolver(changePasswordInputSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  return { form, schema: changePasswordInputSchema };
}
