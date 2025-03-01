import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import { type RefreshResponse } from '@/types/auth';
import { type AxiosResponse } from 'axios';

export async function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  const response = await publicApi.put(apiRoutes.auth.refresh.path);
  return response;
}
