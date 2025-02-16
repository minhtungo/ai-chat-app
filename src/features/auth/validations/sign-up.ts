import { commonValidations } from '@/lib/validations';
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
    name: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;
