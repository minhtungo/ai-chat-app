import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/api-paths';
import { type LogInInput } from '@/features/auth/validations/log-in';
import { baseApi } from '@/lib/api-client';
import { useAuth } from '@/store/auth';
import { type AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.setQueryData(getUserQueryOptions().queryKey, { user: data.user });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
