import { publicApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { ApiResponse } from '@/types/api';
import type { VerifyOAuthCodeResponse } from '@/types/api/auth/index';

type VerifyOAuthCodeRequest = {
  verifyCode: string;
  authCode: string;
};

export const verifyOAuthCode = (
  data: VerifyOAuthCodeRequest,
): Promise<ApiResponse<VerifyOAuthCodeResponse>> => {
  return publicApi.post(apiRoutes.auth.verifyOAuthCode.path, data);
};
