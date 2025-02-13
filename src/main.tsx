import ReactDOM from 'react-dom/client';
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from '@/routeTree.gen';
import { Spinner } from '@/components/ui/spinner';
import './styles.css';

export const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Spinner />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined,
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    // </React.StrictMode>
  );
}
