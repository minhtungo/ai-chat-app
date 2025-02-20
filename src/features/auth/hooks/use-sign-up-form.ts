import { signUpInputSchema } from '@/api/auth/sign-up';
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
      name: '',
    },
  });

  return { form, schema: signUpInputSchema };
}
