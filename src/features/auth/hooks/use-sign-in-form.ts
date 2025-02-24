import { signInInputSchema } from '@/features/auth/api/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
