import { appRoutes } from '@/config/routes';
import { verifyOAuthCode } from '@/features/auth/api/verify-oauth-code';
import { AUTH_CODE_FE_KEY } from '@/lib/oauth';
import { authStore } from '@/store/auth-store';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/auth/callback/google')({
  head: () => ({
    meta: [
      {
        title: 'Google Auth Callback',
      },
    ],
  }),
  component: RouteComponent,
  validateSearch: z.object({
    verifyCode: z.string(),
  }),
  loaderDeps: ({ search }) => ({
    verifyCode: search.verifyCode,
  }),
  loader: async ({ deps }) => {
    const { verifyCode } = deps;

    if (!verifyCode) {
      throw redirect({ to: appRoutes.auth.signIn.path });
    }
    const authCodeFE = localStorage.getItem(AUTH_CODE_FE_KEY);

    if (!authCodeFE) {
      throw redirect({ to: appRoutes.auth.signIn.path });
    }

    const response = await verifyOAuthCode({
      verifyCode,
      authCode: authCodeFE,
    });

    if (response.success) {
      const { accessToken } = response.data;
      authStore.setState((state) => ({
        ...state,
        state: { ...state.state, token: accessToken },
      }));
      localStorage.removeItem('authCodeFE');
      throw redirect({ to: appRoutes.app.chat.path, replace: true });
    } else {
      toast.error('Failed to verify Google code');
      throw redirect({ to: appRoutes.auth.signIn.path });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/_auth/auth/callback/google"!</div>;
}
