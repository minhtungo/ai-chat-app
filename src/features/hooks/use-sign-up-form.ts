import { signUpSchema } from '@/features/auth/validations/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function useSignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
    },
  });

  return { form, schema: signUpSchema };
}
