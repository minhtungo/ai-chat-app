import { env } from '@/config/env';
import type { InternalAxiosRequestConfig } from 'axios';

export const baseAxiosConfig = {
  baseURL: env.AUTHENTICATION_API_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
};

export type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  sent?: boolean;
};
