import { NotFound } from '@/components/errors/not-found';
import { AppLoadingScreen } from '@/components/loading/app-loading-screen';
import { queryClient } from '@/lib/react-query';
import { routeTree } from '@/routeTree.gen';
import {
  type AuthActions,
  type AuthState,
  initialAuthState,
} from '@/store/auth-store';
import type { QueryClient } from '@tanstack/react-query';
import { ErrorComponent, createRouter } from '@tanstack/react-router';

export type RouterContext = {
  auth: AuthState;
  session: AuthActions;
  queryClient: QueryClient;
};

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <AppLoadingScreen />,
  defaultNotFoundComponent: () => <NotFound />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: initialAuthState as AuthState,
    session: {} as AuthActions,
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
