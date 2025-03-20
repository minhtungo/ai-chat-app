import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { ResetPasswordInput } from '@/features/auth/hooks/use-reset-password-form';
import { handleError } from '@/lib/errors';
import type { ApiResponse } from '@/types/api';
import type { ResetPasswordResponse } from '@/types/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ResetPasswordRequestDto = Omit<ResetPasswordInput, 'confirm_password'>;

const dtoToResetPasswordRequest = (
  data: ResetPasswordInput,
): ResetPasswordRequestDto => {
  return {
    password: data.password,
  };
};

export function resetPassword(
  data: ResetPasswordInput,
): Promise<ApiResponse<ResetPasswordResponse>> {
  const requestDto = dtoToResetPasswordRequest(data);
  return publicApi.post(apiRoutes.auth.resetPassword.path, requestDto);
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onError: (error: AxiosError) => {
      const errorMessage = handleError(
        error,
        'Failed to reset password. Please try again.',
      );
      return errorMessage;
    },
  });
}
