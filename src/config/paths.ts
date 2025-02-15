export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    register: {
      path: '/signup',
      getHref: (redirectTo?: string | null | undefined) =>
        `/signup${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
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
