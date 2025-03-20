import { appRoutes } from '@/config/routes';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth')({
  validateSearch: z.object({
    redirect: z.string().optional(),
    authCodeFE: z.string().optional(),
  }),
  beforeLoad: ({ context, search }) => {
    console.log('AuthLayoutComponent beforeLoad', context);

    if (context.isAuthLoaded && context.isAuthenticated) {
      throw redirect({
        to: search.redirect || appRoutes.app.chat.path,
      });
    }
  },
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-10'>
      <div className='w-full max-w-md'>
        <Outlet />
      </div>
    </div>
  );
}
