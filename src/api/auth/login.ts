import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/api-paths';
import { baseApi } from '@/lib/api-client';
import { useAuth } from '@/store/auth';
import { type AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { commonValidations } from '@/lib/validations';
import { z } from 'zod';

export const logInInputSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type LogInInput = z.infer<typeof logInInputSchema>;

export function loginWithEmailAndPassWord(data: LogInInput): Promise<AuthResponse> {
  return baseApi.post(apiPaths.auth.login.path, data);
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { createSession } = useAuth();

  return useMutation({
    mutationFn: loginWithEmailAndPassWord,
    onSuccess: (data) => {
      createSession({ user: data.user, token: data.accessToken });
      queryClient.setQueryData(getUserQueryOptions().queryKey, data.user);
    },
    onError: (error: AxiosError) => {
      throw error;
    },
  });
}
