import { appRoutes } from '@/config/routes';

export const appNavigations = {
  sidebar: [appRoutes.app.chat, appRoutes.app.files],
  userDropdown: [
    appRoutes.app.profile,
    appRoutes.app.billing,
    appRoutes.app.settings,
  ],
};
