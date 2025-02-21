import { getUserQueryOptions } from '@/api/user/get-user';
import { apiRoutes, appRoutes } from '@/config/routes';
import { baseApi } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { useSession } from '@/store/auth';
import { type AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export const logInInputSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type LogInInput = z.infer<typeof logInInputSchema>;

export function loginWithEmailAndPassWord(
  data: LogInInput,
): Promise<AuthResponse> {
  return baseApi.post(apiRoutes.auth.login.path, data);
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { createSession } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: loginWithEmailAndPassWord,
    onSuccess: async (data) => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, data.user);
      router.navigate({ to: appRoutes.app.chat.path, replace: true });
      createSession(data.accessToken, data.user.id);
    },
    onError: (error: AxiosError) => {
      throw error;
    },
  });
}
