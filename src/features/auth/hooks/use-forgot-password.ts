import { commonValidations } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const forgotPasswordInputSchema = z.object({
  email: commonValidations.email,
});

export function useForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordInputSchema>>({
    resolver: zodResolver(forgotPasswordInputSchema),
    defaultValues: {
      email: '',
    },
  });

  return { form, schema: forgotPasswordInputSchema };
}
