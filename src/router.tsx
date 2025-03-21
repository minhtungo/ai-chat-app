import { queryClient } from '@/api/query-client';
import { NotFound } from '@/components/errors/not-found';
import { AppLoadingScreen } from '@/components/loading/app-loading-screen';
import { routeTree } from '@/routeTree.gen';
import { type AuthActions } from '@/store/auth-store';
import type { QueryClient } from '@tanstack/react-query';
import { ErrorComponent, createRouter } from '@tanstack/react-router';

export type RouterContext = {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  authActions: AuthActions;
  queryClient: QueryClient;
};

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <AppLoadingScreen />,
  defaultNotFoundComponent: () => <NotFound />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    isAuthenticated: false,
    isAuthLoaded: false,
    authActions: {} as AuthActions,
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
