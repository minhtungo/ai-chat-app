import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
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
