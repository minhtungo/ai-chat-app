import { apiPaths } from '@/config/api-paths';
import { baseApi } from '@/lib/api-client';
import { RefreshResponse } from '@/types/auth';
import { AxiosResponse } from 'axios';

export function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  return baseApi.get(apiPaths.auth.refresh.path);
}
