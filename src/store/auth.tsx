import { refreshToken } from '@/api/auth/refresh';
import { getUser, useUser } from '@/api/user/get-user';
import { router } from '@/router';
import { User } from '@/types/user';
import { useRouter } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string;
  isLoaded: boolean;
};

export type AuthActions = {
  setUser: (user: AuthState['user']) => void;
  setToken: (token: AuthState['token']) => void;
  setSession: (session: { user: AuthState['user']; token: AuthState['token'] }) => void;
  clearSession: () => void;
  createSession: () => void;
};

type AuthStoreProviderProps = {
  children: React.ReactNode;
  initialState?: AuthState;
};

type AuthStore = AuthState & AuthActions;

type AuthContext = StoreApi<AuthStore> | null;

type AuthStoreSelector = (state: AuthStore) => any;

const AuthStoreContext = createContext<AuthContext>(null);

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoaded: false,
  token: '',
  user: undefined,
};

export const authStore = createStore<AuthStore>((set) => ({
  ...initialAuthState,
  setUser: (user) => set(() => ({ user })),
  setToken: (token) => set(() => ({ token })),
  clearSession: () => set(() => initialAuthState),
  setSession: ({ user, token }) => set(() => ({ user, token, isAuthenticated: true, isLoaded: true })),
  createSession: async () => {
    const { user } = await getUser();
    console.log('createSession user', user);
    if (!user) {
      set(() => ({ isAuthenticated: false, isLoaded: true }));
    } else {
      set(() => ({ isAuthenticated: true, user, isLoaded: true }));
    }
    router.invalidate();
  },
}));

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const [store] = useState(() => authStore);

  return <AuthStoreContext value={store}>{children}</AuthStoreContext>;
}

function useAuthStore(selector: AuthStoreSelector) {
  const store = useContext(AuthStoreContext);

  useEffect(() => {
    if (store) {
      console.log('useAuthStore useEffect');
      store?.getState().createSession();
      console.log('useAuthStore token', store?.getState().token);
    }
  }, []);

  if (!store) {
    throw new Error('useAuthStore must be used within a AuthStoreProvider');
  }

  return useStore(store, selector);
}

export const useAuth = () => useAuthStore((state) => state);

export function useSession(): AuthActions {
  return useAuthStore((state) => state);
}
