import { apiRoutes } from '@/config/routes';
import { privateApi } from '@/lib/api-client';

export function verifyEmail(token: string) {
  return privateApi.put(apiRoutes.auth.verifyEmail.path, { token });
}
