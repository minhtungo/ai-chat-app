import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { SignUpInput } from '@/features/auth/hooks/use-sign-up-form';
import { type AuthResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

type SignUpRequestDto = Omit<SignUpInput, 'confirm_password'>;

const dtoToSignUpRequest = (data: SignUpInput): SignUpRequestDto => {
  return {
    email: data.email,
    password: data.password,
  };
};

export function signUpWithEmailAndPassWord(
  data: SignUpInput,
): Promise<AuthResponse> {
  const requestDto = dtoToSignUpRequest(data);
  return publicApi.post(apiRoutes.auth.signUp.path, requestDto);
}

export function useSignUpMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
    onSuccess: () => {
      //   queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
}
