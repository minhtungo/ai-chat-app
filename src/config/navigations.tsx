import { appRoutes } from '@/config/routes';

export const publicNavigations = {
  header: [
    appRoutes.public.home,
    appRoutes.public.about,
    appRoutes.public.pricing,
  ],
  footer: [appRoutes.public.privacyPolicy, appRoutes.public.termsOfService],
};

export const appNavigations = {
  sidebar: [appRoutes.app.chat, appRoutes.app.quiz, appRoutes.app.lesson],
  userDropdown: [
    appRoutes.account.profile,
    appRoutes.account.billing,
    appRoutes.account.settings,
  ],
};

export const accountNavigations = {
  sidebar: [
    appRoutes.account.profile,
    appRoutes.account.billing,
    appRoutes.account.settings,
  ],
};
