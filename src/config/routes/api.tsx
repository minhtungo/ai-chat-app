const authRootPath = '/auth';

export const apiRoutes = {
  auth: {
    signIn: {
      path: `${authRootPath}/sign-in`,
    },
    signUp: {
      path: `${authRootPath}/sign-up`,
    },
    signOut: {
      path: `${authRootPath}/sign-out`,
    },
    refresh: {
      path: `${authRootPath}/refresh`,
    },
    forgotPassword: {
      path: `${authRootPath}/forgot-password`,
    },
    resetPassword: {
      path: `${authRootPath}/reset-password`,
    },
    verifyEmail: {
      path: `${authRootPath}/verify-email`,
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
