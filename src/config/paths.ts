export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    register: {
      path: '/signup',
      getHref: (redirect?: string | null | undefined) =>
        `/signup${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
    },
    login: {
      path: '/login',
      getHref: (redirect?: string | null | undefined) =>
        `/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`,
    },
  },
  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    chat: {
      path: '/chat',
      getHref: () => '/chat',
    },
    files: {
      path: '/files',
      getHref: () => '/files',
    },
    profile: {
      path: 'profile',
      getHref: () => '/profile',
    },
  },
} as const;
