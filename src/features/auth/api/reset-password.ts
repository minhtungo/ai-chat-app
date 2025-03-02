import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { ResetPasswordInput } from '@/features/auth/hooks/use-reset-password-form';
import { useMutation } from '@tanstack/react-query';

type ResetPasswordRequestDto = Omit<ResetPasswordInput, 'confirm_password'>;

const dtoToResetPasswordRequest = (
  data: ResetPasswordInput,
): ResetPasswordRequestDto => {
  return {
    password: data.password,
  };
};

export function resetPassword(data: ResetPasswordInput) {
  const requestDto = dtoToResetPasswordRequest(data);
  return publicApi.post(apiRoutes.auth.resetPassword.path, requestDto);
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
