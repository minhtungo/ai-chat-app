import { signUpInputSchema } from '@/features/auth/api/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
