import { User } from '@/types/user';
import { createContext, useContext, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string;
  isLoaded: boolean;
};

type AuthStoreProviderProps = {
  children: React.ReactNode;
  initialState?: AuthState;
};

type AuthStore = AuthState & {
  actions: {
    login: () => void;
    logout: () => void;
  };
};

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
  actions: {
    login: () => set((state) => ({ ...state, isAuthenticated: true })),
    logout: () => set((state) => ({ ...state, isAuthenticated: false })),
  },
}));

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const [store] = useState(() => authStore);

  return <AuthStoreContext value={store}>{children}</AuthStoreContext>;
}

export function useAuthStore(selector: AuthStoreSelector) {
  const store = useContext(AuthStoreContext);

  if (!store) {
    throw new Error('useAuthStore must be used within a AuthStoreProvider');
  }

  return useStore(store, selector);
}

export const useAuth = () => useAuthStore((state) => state.isAuthenticated);
