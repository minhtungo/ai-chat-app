import { commonValidations } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const signUpInputSchema = z
  .object({
    email: commonValidations.email,
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

export type SignUpInput = z.infer<typeof signUpInputSchema>;

export function useSignUpForm() {
  const form = useForm<z.infer<typeof signUpInputSchema>>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  return { form, schema: signUpInputSchema };
}
