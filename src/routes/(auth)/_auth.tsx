import { createFileRoute, Outlet } from '@tanstack/react-router';
import { GalleryVerticalEnd } from 'lucide-react';

export const Route = createFileRoute('/(auth)/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Outlet />
      </div>
    </div>
  );
}
