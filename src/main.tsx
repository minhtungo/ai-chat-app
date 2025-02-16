import { useUser } from '@/api/user/get-user';
import { queryClient } from '@/lib/react-query';
import { router } from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import '@/styles/globals.css';

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
