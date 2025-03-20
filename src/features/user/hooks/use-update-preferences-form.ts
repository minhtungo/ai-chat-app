import { useUser } from '@/features/user/api/get-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const updatePreferencesInputSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
});

export type UpdatePreferencesInput = z.infer<
  typeof updatePreferencesInputSchema
>;

export function useUpdatePreferencesForm() {
  const { data: user } = useUser();
  const form = useForm<z.infer<typeof updatePreferencesInputSchema>>({
    resolver: zodResolver(updatePreferencesInputSchema),
    defaultValues: {
      theme: user?.preferences?.theme ?? 'system',
    },
  });

  return { form, schema: updatePreferencesInputSchema };
}
