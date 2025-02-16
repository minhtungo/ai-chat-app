import { apiPaths } from '@/config/apiPaths';
import { api } from '@/lib/api-client';
import { RefreshResponse } from '@/types/auth';
import { AxiosResponse } from 'axios';

export async function refreshToken(): Promise<AxiosResponse<RefreshResponse>> {
  return api.post(apiPaths.auth.refresh.path);
}
