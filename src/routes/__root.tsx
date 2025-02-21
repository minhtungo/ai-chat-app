import type { RouterContext } from '@/router';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    console.log('RootComponent beforeLoad', context.auth);
    if (!context.auth.isLoaded) {
      await context.session.initializeAuth();
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
