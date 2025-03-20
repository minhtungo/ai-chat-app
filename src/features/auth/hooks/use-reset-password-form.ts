import { commonValidations } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const resetPasswordInputSchema = z
  .object({
    password: commonValidations.password,
    confirm_password: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

export function useResetPasswordForm() {
  const form = useForm<z.infer<typeof resetPasswordInputSchema>>({
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  return { form, schema: resetPasswordInputSchema };
}
