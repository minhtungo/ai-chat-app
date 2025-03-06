import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import { handleError } from '@/lib/errors';
import type { ApiResponse } from '@/types/api';
import { type RefreshResponse } from '@/types/api/auth/index';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export function forgotPassword(
  email: string,
): Promise<ApiResponse<RefreshResponse>> {
  return publicApi.post(apiRoutes.auth.forgotPassword.path, { email });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onError: (error: AxiosError) => {
      const errorMessage = handleError(
        error,
        'Failed to forgot password. Please try again.',
      );
      return errorMessage;
    },
  });
}
