import { apiPaths } from '@/config/api-paths';
import { type SignUpInput } from '@/features/auth/validations/sign-up';
import { api } from '@/lib/api-client';
import { type AuthResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export function signUpWithEmailAndPassWord(data: SignUpInput): Promise<AuthResponse> {
  return api.post(apiPaths.auth.login.path, data);
}

export function useSignUpMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
    onSuccess: (data) => {
      //   queryClient.setQueryData(userQueryKey, data.user);
      //   sessionStorage.setItem(appConfig.accessToken.name, data.accessToken);
      onSuccess?.();
    },
  });
}
