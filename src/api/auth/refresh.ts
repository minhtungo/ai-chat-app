import { apiPaths } from '@/config/apiPaths';
import { api } from '@/lib/api-client';
import { RefreshResponse } from '@/types/auth';
import { AxiosResponse } from 'axios';

export function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  return api.get(apiPaths.auth.refresh.path);
}
