import type { RouterContext } from '@/router';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
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
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  );
}
