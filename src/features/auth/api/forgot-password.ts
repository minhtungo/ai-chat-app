import { apiRoutes } from '@/config/routes';
import { baseApi } from '@/lib/api-client';
import { type RefreshResponse } from '@/types/auth';
import { type AxiosResponse } from 'axios';

export function forgotPassword(
  email: string,
): Promise<AxiosResponse<RefreshResponse>> {
  return baseApi.post(apiRoutes.auth.forgotPassword.path, { email });
}
