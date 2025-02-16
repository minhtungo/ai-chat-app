import { User } from '@/types/user';

export type AuthResponse = {
  user: User;
  accessToken: string;
};
