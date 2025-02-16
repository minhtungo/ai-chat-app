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

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return;
    }

    //TODO: handle refresh token
    if (error.response?.status === 401) {
      const response = await refreshToken();
      const newAccessToken = response.data.accessToken;

      sessionStorage.setItem(appConfig.accessToken.name, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    return Promise.reject(error);
  }
);
