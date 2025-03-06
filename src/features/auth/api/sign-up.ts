import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { SignUpInput } from '@/features/auth/hooks/use-sign-up-form';
import { handleError } from '@/lib/errors';
import type { ApiResponse } from '@/types/api';
import { type SignUpResponse } from '@/types/api/auth/index';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type SignUpRequestDto = Omit<SignUpInput, 'confirm_password'>;

const dtoToSignUpRequest = (data: SignUpInput): SignUpRequestDto => {
  return {
    email: data.email,
    password: data.password,
  };
};

export function signUpWithEmailAndPassWord(
  data: SignUpInput,
): Promise<ApiResponse<SignUpResponse>> {
  const requestDto = dtoToSignUpRequest(data);
  return publicApi.post(apiRoutes.auth.signUp.path, requestDto);
}

export function useSignUpMutation() {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
    onSuccess: () => {
      //   queryClient.setQueryData(userQueryKey, data.user);
    },
    onError: (error: AxiosError) => {
      const errorMessage = handleError(
        error,
        'Failed to sign up. Please try again.',
      );
      return errorMessage;
    },
  });
}
