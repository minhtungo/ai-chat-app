export type User = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
  };
};
