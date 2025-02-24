import { apiRoutes, appRoutes } from '@/config/routes';
import { getUserQueryOptions } from '@/features/user/api/get-user';
import { baseApi } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { useSession } from '@/store/auth-store';
import { type AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export const signInInputSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
  code: z.optional(z.string()),
});

export type SignInInput = z.infer<typeof signInInputSchema>;

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
): Promise<AuthResponse> {
  const requestDto = dtoToSignInRequest(data);
  return baseApi.post(apiRoutes.auth.signIn.path, requestDto);
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const { createSession } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: signInWithEmailAndPassWord,
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
