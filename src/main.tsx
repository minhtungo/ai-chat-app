import { getUserQueryOptions, useUser } from '@/api/user/get-user';
import { Spinner } from '@/components/ui/spinner';
import { queryClient } from '@/lib/react-query';
import { routeTree } from '@/routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Spinner />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    user: undefined,
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

function App() {
  const { data } = useUser();
  return <RouterProvider router={router} context={{ user: data }} />;
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
