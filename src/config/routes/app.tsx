import {
  Book,
  Brain,
  CreditCard,
  File,
  MessageSquare,
  Settings,
  User,
} from '@/components/icons';

const appRootPath = '';

export const appRoutes = {
  home: {
    path: '/',
  },
  public: {
    home: {
      path: '/',
      name: 'Home',
    },
    about: {
      path: '/',
      name: 'About',
    },
    pricing: {
      path: '/',
      name: 'Pricing',
    },
    privacyPolicy: {
      path: '/',
      name: 'Privacy Policy',
    },
    termsOfService: {
      path: '/',
      name: 'Terms',
    },
  },
  auth: {
    signUp: {
      path: '/sign-up',
      name: 'Signup',
    },
    signIn: {
      path: '/sign-in',
      name: 'Sign In',
    },
  },
  app: {
    chat: {
      path: `${appRootPath}/chat`,
      name: 'Chat',
      icon: MessageSquare,
    },
    quiz: {
      path: `${appRootPath}/quiz`,
      name: 'Quiz',
      icon: Brain,
    },
    lesson: {
      path: `${appRootPath}/lesson`,
      name: 'Lesson',
      icon: Book,
    },
  },
  account: {
    root: {
      path: `${appRootPath}/account`,
      name: 'Account',
      icon: User,
    },
    profile: {
      path: `${appRootPath}/account/profile`,
      name: 'Profile',
      icon: User,
    },
    preferences: {
      path: `${appRootPath}/account/preferences`,
      name: 'Preferences',
      icon: Settings,
    },
    billing: {
      path: `${appRootPath}/account/billing`,
      name: 'Billing',
      icon: CreditCard,
    },
    settings: {
      path: `${appRootPath}/account/settings`,
      name: 'Settings',
      icon: Settings,
    },
    files: {
      path: `${appRootPath}/account/files`,
      name: 'Files',
      icon: File,
    },
  },
} as const;
