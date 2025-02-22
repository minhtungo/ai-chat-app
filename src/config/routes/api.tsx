export const apiRoutes = {
  auth: {
    login: {
      path: '/login',
    },
    signup: {
      path: '/signup',
    },
    logout: {
      path: '/logout',
    },
    refresh: {
      path: '/refresh',
    },
  },
  user: {
    me: {
      path: '/user/me',
    },
  },
  chat: {
    history: {
      path: '/chat/history',
    },
    list: {
      path: '/chat/list',
    },
  },
} as const;
