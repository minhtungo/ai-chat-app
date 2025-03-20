import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import { authStore } from '@/store/auth-store';
import type { ApiResponse } from '@/types/api';
import { type RefreshResponse } from '@/types/api/auth/index';

export async function refreshToken(): Promise<ApiResponse<RefreshResponse>> {
  const accessToken = authStore.getState().state.token;
  return publicApi.put(apiRoutes.auth.refresh.path, {
    accessToken,
  });
}
