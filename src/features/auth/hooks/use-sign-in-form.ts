import { commonValidations } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const signInInputSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type SignInInput = z.infer<typeof signInInputSchema>;

export function useSignInForm() {
  const form = useForm<z.infer<typeof signInInputSchema>>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { form, schema: signInInputSchema };
}
