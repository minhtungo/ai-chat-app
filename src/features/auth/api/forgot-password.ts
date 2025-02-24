import { apiRoutes } from '@/config/routes';
import { publicApi } from '@/lib/api-client';
import { type RefreshResponse } from '@/types/auth';
import { type AxiosResponse } from 'axios';

export function forgotPassword(
  email: string,
): Promise<AxiosResponse<RefreshResponse>> {
  return publicApi.post(apiRoutes.auth.forgotPassword.path, { email });
}
