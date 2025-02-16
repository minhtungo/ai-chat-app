import { paths } from '@/config/paths';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({
        to: search.redirect || paths.app.chat.path,
      });
    }
  },
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Outlet />
      </div>
    </div>
  );
}
