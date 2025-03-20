import { type CustomAxiosRequestConfig, baseAxiosConfig } from '@/api/axios';
import { env } from '@/config/env';
import { appRoutes } from '@/config/routes';
import { refreshToken } from '@/features/auth/api/refresh-token';
import { authStore } from '@/store/auth-store';
import Axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const accessToken = authStore.getState().state.token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}

export const publicApi = Axios.create(baseAxiosConfig);

publicApi.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const privateApi = Axios.create({
  ...baseAxiosConfig,
});

export const chatApi = Axios.create({
  ...baseAxiosConfig,
  baseURL: env.CHAT_API_URL,
});

privateApi.interceptors.request.use(authRequestInterceptor);

privateApi.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const prevRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 403 && prevRequest && !prevRequest.sent) {
      prevRequest.sent = true;
      try {
        const response = await refreshToken();
        if (response.data.accessToken) {
          const newAccessToken = response.data.accessToken;
          authStore.setState((state) => ({
            ...state,
            state: { ...state.state, token: newAccessToken },
          }));
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateApi(prevRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        window.location.href = appRoutes.auth.signIn.path;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
