import { commonValidations } from '@/lib/validations';
import { z } from 'zod';

export const logInSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type logInProps = z.infer<typeof logInSchema>;
