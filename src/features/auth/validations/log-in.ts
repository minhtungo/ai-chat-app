import { commonValidations } from '@/lib/validations';
import { z } from 'zod';

export const logInInputSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type LogInInput = z.infer<typeof logInInputSchema>;
