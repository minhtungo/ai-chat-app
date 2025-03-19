import { env } from '@/config/env';
import { appRoutes } from '@/config/routes';

export const appConfig = {
  appName: env.APP_NAME,
  cookie: {
    accessToken: {
      name: env.ACCESS_TOKEN_COOKIE,
    },
  },
  menu: {
    chatSidebar: [appRoutes.app.chat, appRoutes.app.quiz, appRoutes.app.lesson],
    accountSidebar: [
      appRoutes.account.profile,
      appRoutes.account.billing,
      appRoutes.account.settings,
    ],
    userDropdown: [
      appRoutes.account.profile,
      appRoutes.account.billing,
      appRoutes.account.settings,
    ],
    header: [
      appRoutes.public.home,
      appRoutes.public.about,
      appRoutes.public.pricing,
    ],
    footer: [appRoutes.public.privacyPolicy, appRoutes.public.termsOfService],
  },
};
