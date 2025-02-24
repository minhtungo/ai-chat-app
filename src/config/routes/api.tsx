export const apiRoutes = {
  auth: {
    signIn: {
      path: '/login',
    },
    signUp: {
      path: '/signup',
    },
    signOut: {
      path: '/logout',
    },
    refresh: {
      path: '/refresh',
    },
    forgotPassword: {
      path: '/forgot-password',
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
