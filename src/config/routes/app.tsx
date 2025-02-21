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
    getHref: () => '/',
  },
  auth: {
    signup: {
      path: '/signup',
      name: 'Signup',
      getHref: (redirect?: string | null | undefined) =>
        `/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
    },
    login: {
      path: '/login',
      name: 'Login',
      getHref: (redirect?: string | null | undefined) =>
        `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
    },
  },
  app: {
    chat: {
      path: '/chat',
      name: 'Chat',
      getHref: () => '/chat',
      icon: MessageSquare,
    },
    files: {
      path: '/files',
      name: 'Files',
      getHref: () => '/files',
      icon: File,
    },
    profile: {
      path: '/profile',
      name: 'Profile',
      getHref: () => '/profile',
      icon: User,
    },
    billing: {
      path: '/profile/billing',
      name: 'Billing',
      getHref: () => '/profile/billing',
      icon: CreditCard,
    },
    settings: {
      path: '/settings',
      name: 'Settings',
      getHref: () => '/settings',
      icon: Settings,
    },
  },
} as const;
