import type { RouterContext } from '@/router';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
