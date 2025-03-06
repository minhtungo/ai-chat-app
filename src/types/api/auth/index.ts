import { type User } from '@/types/user';

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type SignInResponse = {
  convertedUser: User;
  accessToken: string;
};

export type SignUpResponse = {
  user: User;
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type VerifyOAuthCodeResponse = {
  accessToken: string;
  user: User;
};
