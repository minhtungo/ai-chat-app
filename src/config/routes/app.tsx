import {
  CreditCard,
  File,
  MessageSquare,
  Settings,
  User,
} from '@/components/icons';

export const appRoutes = {
  home: {
    path: '/',
  },
  auth: {
    signup: {
      path: '/signup',
      name: 'Signup',
    },
    login: {
      path: '/login',
      name: 'Login',
    },
  },
  app: {
    chat: {
      path: '/chat',
      name: 'Chat',
      icon: MessageSquare,
    },
  },
  account: {
    root: {
      path: '/account',
      name: 'Account',
      icon: User,
    },
    profile: {
      path: '/account/profile',
      name: 'Profile',
      icon: User,
    },
    billing: {
      path: '/account/billing',
      name: 'Billing',
      icon: CreditCard,
    },
    settings: {
      path: '/account/settings',
      name: 'Settings',
      icon: Settings,
    },
    files: {
      path: '/account/files',
      name: 'Files',
      icon: File,
    },
  },
} as const;
