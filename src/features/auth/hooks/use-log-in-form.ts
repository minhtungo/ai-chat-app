import { logInInputSchema } from '@/features/auth/api/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function useLogInForm() {
  const form = useForm<z.infer<typeof logInInputSchema>>({
    resolver: zodResolver(logInInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { form, schema: logInInputSchema };
}
