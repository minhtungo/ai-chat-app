import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/apiPaths';
import { appConfig } from '@/config/app';
import { LogInInput } from '@/features/auth/validations/log-in';
import { api } from '@/lib/api-client';
import { AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function loginWithEmailAndPassWord(data: LogInInput): Promise<AuthResponse> {
  return api.post(apiPaths.auth.login.path, data);
}

export function useLoginMutation({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassWord,
    onSuccess: (data) => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, data.user);
      sessionStorage.setItem(appConfig.accessToken.name, data.accessToken);
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      sessionStorage.removeItem(appConfig.accessToken.name);
    },
  });
}
