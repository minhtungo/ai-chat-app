import { PublicHeader } from '@/components/layouts/public-header';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
}
