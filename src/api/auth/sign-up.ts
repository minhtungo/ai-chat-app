import { apiPaths } from '@/config/api-paths';
import { api } from '@/lib/api-client';
import { type AuthResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { commonValidations } from '@/lib/validations';
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
    name: z.string().min(1, 'Name is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;

export function signUpWithEmailAndPassWord(data: SignUpInput): Promise<AuthResponse> {
  return api.post(apiPaths.auth.login.path, data);
}

export function useSignUpMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: signUpWithEmailAndPassWord,
    onSuccess: (data) => {
      //   queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
}
