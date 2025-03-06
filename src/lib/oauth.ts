import { env } from '@/config/env';
import { apiRoutes } from '@/config/routes';
import { generateToken } from '@/utils/token';
import { str } from 'crc-32';

export const AUTH_CODE_FE_KEY = 'authCodeFE';

export function handleOAuthLogin(provider: 'google' | 'facebook') {
  const authCodeFE = generateToken();
  const hashedAuthCodeFE = str(authCodeFE);

  localStorage.setItem(AUTH_CODE_FE_KEY, authCodeFE);
  const redirectUri = `${window.location.origin}/auth/callback/google`;
  const OAuthUrl = `${env.API_URL}${provider === 'google' ? apiRoutes.auth.googleOAuth.path : apiRoutes.auth.facebookOAuth.path}?redirect_uri=${encodeURIComponent(redirectUri)}&authCodeFE=${hashedAuthCodeFE}`;

  window.location.href = OAuthUrl;
}
