import { refreshToken } from '@/api/auth/refresh';
import { getUser, getUserQueryOptions } from '@/api/user/get-user';
import { queryClient } from '@/lib/react-query';
import { User } from '@/types/user';
import { createContext, useContext, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string;
  isLoaded: boolean;
};

export type AuthActions = {
  setToken: (token: AuthState['token']) => void;
  clearSession: () => void;
  createSession: ({ user, token }: { user: AuthState['user']; token: AuthState['token'] }) => void;
  initializeAuth: () => Promise<void>;
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
  setToken: (token) => set(() => ({ token })),
  clearSession: () => set(() => initialAuthState),
  createSession: ({ user, token }) => set(() => ({ user, token, isAuthenticated: true, isLoaded: true })),
  initializeAuth: async () => {
    try {
      const { data } = await refreshToken();
      if (data?.accessToken) {
        set(() => ({ token: data.accessToken }));
        const response = await getUser();
        queryClient.setQueryData(getUserQueryOptions().queryKey, { user: response.user });
        set(() => ({
          isAuthenticated: true,
          user: response.user,
          isLoaded: true,
        }));
      } else {
        set(() => ({ isAuthenticated: false, isLoaded: true }));
      }
    } catch (error) {
      set(() => ({ isAuthenticated: false, isLoaded: true }));
    }
  },
}));

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const [store] = useState(() => authStore);

  return <AuthStoreContext value={store}>{children}</AuthStoreContext>;
}

function useAuthStore(selector: AuthStoreSelector) {
  const store = useContext(AuthStoreContext);

  if (!store) {
    throw new Error('useAuthStore must be used within a AuthStoreProvider');
  }

  return useStore(store, selector);
}

export const useAuth = (): AuthActions & AuthState => useAuthStore((state) => state);
