/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as PublicIndexImport } from './routes/_public/index'
import { Route as AuthSignUpImport } from './routes/_auth/sign-up'
import { Route as AuthSignInImport } from './routes/_auth/sign-in'
import { Route as AuthResetPasswordImport } from './routes/_auth/reset-password'
import { Route as AuthForgotPasswordImport } from './routes/_auth/forgot-password'
import { Route as AppChatImport } from './routes/_app/chat'
import { Route as AppAccountImport } from './routes/_app/account'
import { Route as AppQuizIndexImport } from './routes/_app/quiz/index'
import { Route as AppLessonIndexImport } from './routes/_app/lesson/index'
import { Route as AppChatIndexImport } from './routes/_app/chat/index'
import { Route as AppAccountIndexImport } from './routes/_app/account/index'
import { Route as AuthVerifyEmailTokenImport } from './routes/_auth/verify-email.$token'
import { Route as AppChatIdImport } from './routes/_app/chat/$id'
import { Route as AppAccountSettingsImport } from './routes/_app/account/settings'
import { Route as AppAccountProfileImport } from './routes/_app/account/profile'
import { Route as AppAccountBillingImport } from './routes/_app/account/billing'
import { Route as AppAccountFilesIndexImport } from './routes/_app/account/files/index'

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexRoute = PublicIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PublicRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthRoute,
} as any)

const AuthResetPasswordRoute = AuthResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

const AppChatRoute = AppChatImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => AppRoute,
} as any)

const AppAccountRoute = AppAccountImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => AppRoute,
} as any)

const AppQuizIndexRoute = AppQuizIndexImport.update({
  id: '/quiz/',
  path: '/quiz/',
  getParentRoute: () => AppRoute,
} as any)

const AppLessonIndexRoute = AppLessonIndexImport.update({
  id: '/lesson/',
  path: '/lesson/',
  getParentRoute: () => AppRoute,
} as any)

const AppChatIndexRoute = AppChatIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppChatRoute,
} as any)

const AppAccountIndexRoute = AppAccountIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppAccountRoute,
} as any)

const AuthVerifyEmailTokenRoute = AuthVerifyEmailTokenImport.update({
  id: '/verify-email/$token',
  path: '/verify-email/$token',
  getParentRoute: () => AuthRoute,
} as any)

const AppChatIdRoute = AppChatIdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => AppChatRoute,
} as any)

const AppAccountSettingsRoute = AppAccountSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppAccountRoute,
} as any)

const AppAccountProfileRoute = AppAccountProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AppAccountRoute,
} as any)

const AppAccountBillingRoute = AppAccountBillingImport.update({
  id: '/billing',
  path: '/billing',
  getParentRoute: () => AppAccountRoute,
} as any)

const AppAccountFilesIndexRoute = AppAccountFilesIndexImport.update({
  id: '/files/',
  path: '/files/',
  getParentRoute: () => AppAccountRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/_app/account': {
      id: '/_app/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AppAccountImport
      parentRoute: typeof AppImport
    }
    '/_app/chat': {
      id: '/_app/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof AppChatImport
      parentRoute: typeof AppImport
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/reset-password': {
      id: '/_auth/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof AuthResetPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/sign-in': {
      id: '/_auth/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthImport
    }
    '/_auth/sign-up': {
      id: '/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof AuthImport
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexImport
      parentRoute: typeof PublicImport
    }
    '/_app/account/billing': {
      id: '/_app/account/billing'
      path: '/billing'
      fullPath: '/account/billing'
      preLoaderRoute: typeof AppAccountBillingImport
      parentRoute: typeof AppAccountImport
    }
    '/_app/account/profile': {
      id: '/_app/account/profile'
      path: '/profile'
      fullPath: '/account/profile'
      preLoaderRoute: typeof AppAccountProfileImport
      parentRoute: typeof AppAccountImport
    }
    '/_app/account/settings': {
      id: '/_app/account/settings'
      path: '/settings'
      fullPath: '/account/settings'
      preLoaderRoute: typeof AppAccountSettingsImport
      parentRoute: typeof AppAccountImport
    }
    '/_app/chat/$id': {
      id: '/_app/chat/$id'
      path: '/$id'
      fullPath: '/chat/$id'
      preLoaderRoute: typeof AppChatIdImport
      parentRoute: typeof AppChatImport
    }
    '/_auth/verify-email/$token': {
      id: '/_auth/verify-email/$token'
      path: '/verify-email/$token'
      fullPath: '/verify-email/$token'
      preLoaderRoute: typeof AuthVerifyEmailTokenImport
      parentRoute: typeof AuthImport
    }
    '/_app/account/': {
      id: '/_app/account/'
      path: '/'
      fullPath: '/account/'
      preLoaderRoute: typeof AppAccountIndexImport
      parentRoute: typeof AppAccountImport
    }
    '/_app/chat/': {
      id: '/_app/chat/'
      path: '/'
      fullPath: '/chat/'
      preLoaderRoute: typeof AppChatIndexImport
      parentRoute: typeof AppChatImport
    }
    '/_app/lesson/': {
      id: '/_app/lesson/'
      path: '/lesson'
      fullPath: '/lesson'
      preLoaderRoute: typeof AppLessonIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/quiz/': {
      id: '/_app/quiz/'
      path: '/quiz'
      fullPath: '/quiz'
      preLoaderRoute: typeof AppQuizIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/account/files/': {
      id: '/_app/account/files/'
      path: '/files'
      fullPath: '/account/files'
      preLoaderRoute: typeof AppAccountFilesIndexImport
      parentRoute: typeof AppAccountImport
    }
  }
}

// Create and export the route tree

interface AppAccountRouteChildren {
  AppAccountBillingRoute: typeof AppAccountBillingRoute
  AppAccountProfileRoute: typeof AppAccountProfileRoute
  AppAccountSettingsRoute: typeof AppAccountSettingsRoute
  AppAccountIndexRoute: typeof AppAccountIndexRoute
  AppAccountFilesIndexRoute: typeof AppAccountFilesIndexRoute
}

const AppAccountRouteChildren: AppAccountRouteChildren = {
  AppAccountBillingRoute: AppAccountBillingRoute,
  AppAccountProfileRoute: AppAccountProfileRoute,
  AppAccountSettingsRoute: AppAccountSettingsRoute,
  AppAccountIndexRoute: AppAccountIndexRoute,
  AppAccountFilesIndexRoute: AppAccountFilesIndexRoute,
}

const AppAccountRouteWithChildren = AppAccountRoute._addFileChildren(
  AppAccountRouteChildren,
)

interface AppChatRouteChildren {
  AppChatIdRoute: typeof AppChatIdRoute
  AppChatIndexRoute: typeof AppChatIndexRoute
}

const AppChatRouteChildren: AppChatRouteChildren = {
  AppChatIdRoute: AppChatIdRoute,
  AppChatIndexRoute: AppChatIndexRoute,
}

const AppChatRouteWithChildren =
  AppChatRoute._addFileChildren(AppChatRouteChildren)

interface AppRouteChildren {
  AppAccountRoute: typeof AppAccountRouteWithChildren
  AppChatRoute: typeof AppChatRouteWithChildren
  AppLessonIndexRoute: typeof AppLessonIndexRoute
  AppQuizIndexRoute: typeof AppQuizIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppAccountRoute: AppAccountRouteWithChildren,
  AppChatRoute: AppChatRouteWithChildren,
  AppLessonIndexRoute: AppLessonIndexRoute,
  AppQuizIndexRoute: AppQuizIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthResetPasswordRoute: typeof AuthResetPasswordRoute
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
  AuthVerifyEmailTokenRoute: typeof AuthVerifyEmailTokenRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthResetPasswordRoute: AuthResetPasswordRoute,
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
  AuthVerifyEmailTokenRoute: AuthVerifyEmailTokenRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface PublicRouteChildren {
  PublicIndexRoute: typeof PublicIndexRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicIndexRoute: PublicIndexRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PublicRouteWithChildren
  '/account': typeof AppAccountRouteWithChildren
  '/chat': typeof AppChatRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/': typeof PublicIndexRoute
  '/account/billing': typeof AppAccountBillingRoute
  '/account/profile': typeof AppAccountProfileRoute
  '/account/settings': typeof AppAccountSettingsRoute
  '/chat/$id': typeof AppChatIdRoute
  '/verify-email/$token': typeof AuthVerifyEmailTokenRoute
  '/account/': typeof AppAccountIndexRoute
  '/chat/': typeof AppChatIndexRoute
  '/lesson': typeof AppLessonIndexRoute
  '/quiz': typeof AppQuizIndexRoute
  '/account/files': typeof AppAccountFilesIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/': typeof PublicIndexRoute
  '/account/billing': typeof AppAccountBillingRoute
  '/account/profile': typeof AppAccountProfileRoute
  '/account/settings': typeof AppAccountSettingsRoute
  '/chat/$id': typeof AppChatIdRoute
  '/verify-email/$token': typeof AuthVerifyEmailTokenRoute
  '/account': typeof AppAccountIndexRoute
  '/chat': typeof AppChatIndexRoute
  '/lesson': typeof AppLessonIndexRoute
  '/quiz': typeof AppQuizIndexRoute
  '/account/files': typeof AppAccountFilesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_app/account': typeof AppAccountRouteWithChildren
  '/_app/chat': typeof AppChatRouteWithChildren
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/reset-password': typeof AuthResetPasswordRoute
  '/_auth/sign-in': typeof AuthSignInRoute
  '/_auth/sign-up': typeof AuthSignUpRoute
  '/_public/': typeof PublicIndexRoute
  '/_app/account/billing': typeof AppAccountBillingRoute
  '/_app/account/profile': typeof AppAccountProfileRoute
  '/_app/account/settings': typeof AppAccountSettingsRoute
  '/_app/chat/$id': typeof AppChatIdRoute
  '/_auth/verify-email/$token': typeof AuthVerifyEmailTokenRoute
  '/_app/account/': typeof AppAccountIndexRoute
  '/_app/chat/': typeof AppChatIndexRoute
  '/_app/lesson/': typeof AppLessonIndexRoute
  '/_app/quiz/': typeof AppQuizIndexRoute
  '/_app/account/files/': typeof AppAccountFilesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/account'
    | '/chat'
    | '/forgot-password'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/account/billing'
    | '/account/profile'
    | '/account/settings'
    | '/chat/$id'
    | '/verify-email/$token'
    | '/account/'
    | '/chat/'
    | '/lesson'
    | '/quiz'
    | '/account/files'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/account/billing'
    | '/account/profile'
    | '/account/settings'
    | '/chat/$id'
    | '/verify-email/$token'
    | '/account'
    | '/chat'
    | '/lesson'
    | '/quiz'
    | '/account/files'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_public'
    | '/_app/account'
    | '/_app/chat'
    | '/_auth/forgot-password'
    | '/_auth/reset-password'
    | '/_auth/sign-in'
    | '/_auth/sign-up'
    | '/_public/'
    | '/_app/account/billing'
    | '/_app/account/profile'
    | '/_app/account/settings'
    | '/_app/chat/$id'
    | '/_auth/verify-email/$token'
    | '/_app/account/'
    | '/_app/chat/'
    | '/_app/lesson/'
    | '/_app/quiz/'
    | '/_app/account/files/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth",
        "/_public"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/account",
        "/_app/chat",
        "/_app/lesson/",
        "/_app/quiz/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/reset-password",
        "/_auth/sign-in",
        "/_auth/sign-up",
        "/_auth/verify-email/$token"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/"
      ]
    },
    "/_app/account": {
      "filePath": "_app/account.tsx",
      "parent": "/_app",
      "children": [
        "/_app/account/billing",
        "/_app/account/profile",
        "/_app/account/settings",
        "/_app/account/",
        "/_app/account/files/"
      ]
    },
    "/_app/chat": {
      "filePath": "_app/chat.tsx",
      "parent": "/_app",
      "children": [
        "/_app/chat/$id",
        "/_app/chat/"
      ]
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/reset-password": {
      "filePath": "_auth/reset-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/sign-in": {
      "filePath": "_auth/sign-in.tsx",
      "parent": "/_auth"
    },
    "/_auth/sign-up": {
      "filePath": "_auth/sign-up.tsx",
      "parent": "/_auth"
    },
    "/_public/": {
      "filePath": "_public/index.tsx",
      "parent": "/_public"
    },
    "/_app/account/billing": {
      "filePath": "_app/account/billing.tsx",
      "parent": "/_app/account"
    },
    "/_app/account/profile": {
      "filePath": "_app/account/profile.tsx",
      "parent": "/_app/account"
    },
    "/_app/account/settings": {
      "filePath": "_app/account/settings.tsx",
      "parent": "/_app/account"
    },
    "/_app/chat/$id": {
      "filePath": "_app/chat/$id.tsx",
      "parent": "/_app/chat"
    },
    "/_auth/verify-email/$token": {
      "filePath": "_auth/verify-email.$token.tsx",
      "parent": "/_auth"
    },
    "/_app/account/": {
      "filePath": "_app/account/index.tsx",
      "parent": "/_app/account"
    },
    "/_app/chat/": {
      "filePath": "_app/chat/index.tsx",
      "parent": "/_app/chat"
    },
    "/_app/lesson/": {
      "filePath": "_app/lesson/index.tsx",
      "parent": "/_app"
    },
    "/_app/quiz/": {
      "filePath": "_app/quiz/index.tsx",
      "parent": "/_app"
    },
    "/_app/account/files/": {
      "filePath": "_app/account/files/index.tsx",
      "parent": "/_app/account"
    }
  }
}
ROUTE_MANIFEST_END */
