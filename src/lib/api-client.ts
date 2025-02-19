import { refreshToken } from '@/api/auth/refresh';
import { env } from '@/config/env';
import { authStore } from '@/store/auth';

import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    const accessToken = authStore.getState().token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}

const baseAxiosConfig = {
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
};

export const baseApi = Axios.create(baseAxiosConfig);

export const api = Axios.create(baseAxiosConfig);

api.interceptors.request.use(authRequestInterceptor);

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean;
};

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const prevRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message !== 'Invalid Credentials' &&
      prevRequest &&
      !prevRequest.sent
    ) {
      prevRequest.sent = true;
      console.log('prevRequest', prevRequest);
      try {
        const response = await refreshToken();
        const newAccessToken = response?.data.accessToken;
        console.log('prevRequest newAccessToken', newAccessToken);
        authStore.setState(() => ({ token: newAccessToken }));
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
