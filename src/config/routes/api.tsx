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
    preferences: {
      path: '/user/preferences',
    },
    profile: {
      path: '/user/profile',
    },
  },
  chat: {
    history: {
      path: '/chat/history',
    },
    list: {
      path: '/chat/list',
    },
    suggestions: {
      path: '/chat/suggestions',
    },
  },
} as const;
