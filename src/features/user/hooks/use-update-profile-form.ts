import { useUser } from '@/features/user/api/get-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const updateProfileInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().url('Invalid avatar URL'),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export function useUpdateProfileForm() {
  const { data: user } = useUser();
  const form = useForm<z.infer<typeof updateProfileInputSchema>>({
    resolver: zodResolver(updateProfileInputSchema),
    defaultValues: {
      name: user?.name ?? '',
      avatar: user?.avatar ?? '',
    },
  });

  return { form, schema: updateProfileInputSchema };
}
