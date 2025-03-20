import { appConfig } from '@/config/app-config';
import type { RouterContext } from '@/router';
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: appConfig.appDescription,
      },
      {
        title: appConfig.appName,
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    if (!context.isAuthLoaded) {
      await context.authActions.initializeAuth();
    }
  },
  component: RootLayoutComponent,
});

function RootLayoutComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  );
}
