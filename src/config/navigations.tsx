import { appRoutes } from '@/config/routes';

export const appNavigations = {
  sidebar: [appRoutes.app.chat, appRoutes.account.files],
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
    appRoutes.account.files,
    appRoutes.account.settings,
  ],
};
