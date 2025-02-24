import { apiRoutes } from '@/config/routes';
import { publicApi } from '@/lib/api-client';
import { type RefreshResponse } from '@/types/auth';
import { type AxiosResponse } from 'axios';

export function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  return publicApi.get(apiRoutes.auth.refresh.path);
}
