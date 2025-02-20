import { apiRoutes } from '@/config/routes';
import { baseApi } from '@/lib/api-client';
import { type RefreshResponse } from '@/types/auth';
import { type AxiosResponse } from 'axios';

export function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  return baseApi.get(apiRoutes.auth.refresh.path);
}
