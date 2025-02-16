import { env } from '@/config/env';

export const appConfig = {
  appName: 'Lumi',
  accessToken: {
    name: env.ACCESS_TOKEN_COOKIE,
  },
};
