import { privateApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';

export function verifyEmail(token: string) {
  return privateApi.put(apiRoutes.auth.verifyEmail.path, { token });
}
