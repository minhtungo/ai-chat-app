import { env } from '@/config/env';

export const appConfig = {
  appName: env.APP_NAME,
  accessToken: {
    name: env.ACCESS_TOKEN_COOKIE,
  },
};
