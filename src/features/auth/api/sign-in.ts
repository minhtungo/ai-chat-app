import { publicApi } from '@/api/api-client';
import { apiRoutes, appRoutes } from '@/config/routes';
import type { SignInInput } from '@/features/auth/hooks/use-sign-in-form';
import { getUserQueryOptions } from '@/features/user/api/get-user';
import { handleError } from '@/lib/errors';
import { useSession } from '@/store/auth-store';
import type { ApiResponse } from '@/types/api';
import { type SignInResponse } from '@/types/api/auth/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

type SignInRequestDto = SignInInput;

const dtoToSignInRequest = (data: SignInInput): SignInRequestDto => {
  return {
    email: data.email,
    password: data.password,
    code: data.code,
  };
};

export function signInWithEmailAndPassWord(
  data: SignInInput,
): Promise<ApiResponse<SignInResponse>> {
  const requestDto = dtoToSignInRequest(data);
  return publicApi.post(apiRoutes.auth.signIn.path, requestDto);
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const { createSession } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
    onSuccess: async (result) => {
      if (result.success) {
        createSession(result.data.accessToken, result.data.convertedUser.id);
        router.navigate({ to: appRoutes.app.chat.path, replace: true });
        queryClient.setQueryData(
          getUserQueryOptions().queryKey,
          result.data.convertedUser,
        );
      }
    },
    onError: (error: AxiosError) => {
      const errorMessage = handleError(
        error,
        'Failed to sign in. Please check your credentials and try again.',
      );
      return errorMessage;
    },
  });
}
