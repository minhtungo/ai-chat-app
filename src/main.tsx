import { queryClient } from '@/lib/react-query';
import { router } from '@/router';
import { AuthStoreProvider, useAuth } from '@/store/auth';
import '@/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

function App() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthStoreProvider>
        <App />
      </AuthStoreProvider>
    </QueryClientProvider>
  );
}
