import { apiRoutes } from '@/config/routes';
import { publicApi } from '@/lib/api-client';
import { commonValidations } from '@/lib/validations';
import { type AuthResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const signUpInputSchema = z
  .object({
    email: commonValidations.email,
    password: commonValidations.password,
    confirm_password: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;

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
