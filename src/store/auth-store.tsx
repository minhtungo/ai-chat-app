import { queryClient } from '@/api/query-client';
import { refreshToken } from '@/features/auth/api/refresh-token';
import { getUser, getUserQueryOptions } from '@/features/user/api/get-user';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  isLoaded: boolean;
};

export type AuthActions = {
  setToken: (token: AuthState['token']) => void;
  clearSession: () => void;
  createSession: (
    token: AuthState['token'],
    userId: AuthState['userId'],
  ) => void;
  initializeAuth: () => Promise<void>;
};

type AuthStoreProviderProps = {
  children: React.ReactNode;
  initialState?: AuthState;
};

type AuthStore = {
  state: AuthState;
  actions: AuthActions;
};

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
  state: {
    ...initialAuthState,
  },
  actions: {
    setToken: (token) => set((state) => ({ state: { ...state.state, token } })),
    clearSession: () => set(() => ({ state: initialAuthState })),
    createSession: (token, userId) =>
      set(() => ({
        state: { token, userId, isAuthenticated: true, isLoaded: true },
      })),
    initializeAuth: async () => {
      try {
        const { data } = await refreshToken();
        if (data?.accessToken) {
          set((state) => ({
            state: { ...state.state, token: data.accessToken },
          }));
          const user = await getUser();
          queryClient.setQueryData(getUserQueryOptions().queryKey, user.data);

          set((state) => ({
            state: {
              ...state.state,
              isAuthenticated: true,
              isLoaded: true,
              userId: user.data.id,
            },
          }));
        } else {
          set((state) => ({
            state: { ...state.state, isAuthenticated: false, isLoaded: true },
          }));
        }
      } catch (error) {
        set((state) => ({
          state: { ...state.state, isAuthenticated: false, isLoaded: true },
        }));
      }
    },
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

export const useAuth = (): AuthState => useAuthStore((state) => state.state);

export const useSession = (): AuthActions =>
  useAuthStore((state) => state.actions);
