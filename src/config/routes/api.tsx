const apiRootPath = '/api';
const authRootPath = `${apiRootPath}/auth`;
const userRootPath = `${apiRootPath}/user`;

export const apiRoutes = {
  auth: {
    signIn: {
      path: `${authRootPath}/signin`,
    },
    signUp: {
      path: `${authRootPath}/signup`,
    },
    signOut: {
      path: `${authRootPath}/signout`,
    },
    refresh: {
      path: `${authRootPath}/renew-token`,
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
    verifyOAuthCode: {
      path: `${authRootPath}/verify-code`,
    },
    googleOAuth: {
      path: `${authRootPath}/google`,
    },
    facebookOAuth: {
      path: `${authRootPath}/facebook`,
    },
  },
  user: {
    me: {
      path: `${userRootPath}/me`,
    },
    preferences: {
      path: `${userRootPath}/preferences`,
    },
    profile: {
      path: `${userRootPath}/profile`,
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
