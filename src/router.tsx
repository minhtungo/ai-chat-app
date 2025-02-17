import { Spinner } from '@/components/ui/spinner';
import { queryClient } from '@/lib/react-query';
import { routeTree } from '@/routeTree.gen';
import { AuthState, initialAuthState } from '@/store/auth';
import type { QueryClient } from '@tanstack/react-query';
import { ErrorComponent, createRouter } from '@tanstack/react-router';

export type RouterContext = {
  auth: AuthState;
  queryClient: QueryClient;
};

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Spinner />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: initialAuthState,
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
