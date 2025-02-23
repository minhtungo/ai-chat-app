import { getUserQueryOptions } from '@/api/user/get-user';
import { apiRoutes, appRoutes } from '@/config/routes';
import { baseApi } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { useSession } from '@/store/auth-store';
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

type LogInRequestDto = LogInInput;

const dtoToLogInRequest = (data: LogInInput): LogInRequestDto => {
  return {
    email: data.email,
    password: data.password,
    code: data.code,
  };
};

export function loginWithEmailAndPassWord(
  data: LogInInput,
): Promise<AuthResponse> {
  const requestDto = dtoToLogInRequest(data);
  return baseApi.post(apiRoutes.auth.login.path, requestDto);
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
