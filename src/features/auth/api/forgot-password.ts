import { apiRoutes } from '@/config/routes';
import { publicApi } from '@/lib/api-client';
import { type RefreshResponse } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';

export function forgotPassword(
  email: string,
): Promise<AxiosResponse<RefreshResponse>> {
  return publicApi.post(apiRoutes.auth.forgotPassword.path, { email });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
