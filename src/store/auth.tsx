import { refreshToken } from '@/api/auth/refresh-token';
import { getUser, getUserQueryOptions } from '@/api/user/get-user';
import { queryClient } from '@/lib/react-query';
import { createContext, useContext, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  isLoaded: boolean;
};

export type AuthActions = {
  setToken: (token: AuthState['token']) => void;
  clearSession: () => void;
  createSession: (token: AuthState['token'], userId: AuthState['userId']) => void;
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
  userId: '',
};

export const authStore = createStore<AuthStore>((set) => ({
  ...initialAuthState,
  setToken: (token) => set(() => ({ token })),
  clearSession: () => set(() => initialAuthState),
  createSession: (token, userId) => set(() => ({ token, userId, isAuthenticated: true, isLoaded: true })),
  initializeAuth: async () => {
    try {
      const { data } = await refreshToken();
      if (data?.accessToken) {
        set(() => ({ token: data.accessToken }));
        const user = await getUser();
        queryClient.setQueryData(getUserQueryOptions().queryKey, { ...user });
        set(() => ({
          isAuthenticated: true,
          isLoaded: true,
          userId: user.id,
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
