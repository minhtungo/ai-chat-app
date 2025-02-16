import { refreshToken } from '@/api/auth/refresh';
import { appConfig } from '@/config/app';
import { env } from '@/config/env';

import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';

    const accessToken = sessionStorage.getItem(appConfig.accessToken.name);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean;
};

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const prevRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message !== 'Invalid Credentials' &&
      prevRequest &&
      !prevRequest.sent
    ) {
      prevRequest.sent = true;
      try {
        const response = await refreshToken();

        const newAccessToken = response?.data?.accessToken || response.accessToken;
        console.log('New access token:', newAccessToken);
        sessionStorage.setItem(appConfig.accessToken.name, newAccessToken);

        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(prevRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
