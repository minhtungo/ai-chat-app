import { router } from '@/router';
import {
  useAuthActions,
  useAuthIsAuthenticated,
  useAuthIsLoaded,
} from '@/store/auth-store';
import { RouterProvider } from '@tanstack/react-router';

export function App() {
  const isAuthenticated = useAuthIsAuthenticated();
  const isAuthLoaded = useAuthIsLoaded();
  const authActions = useAuthActions();

  return (
    <RouterProvider
      router={router}
      context={{ isAuthenticated, isAuthLoaded, authActions }}
    />
  );
}
