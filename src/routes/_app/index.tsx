import { appRoutes } from '@/config/routes';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: AppLayoutComponent,
  beforeLoad: async ({}) => {
    console.log('beforeLoad _app/index');
    throw redirect({ to: appRoutes.app.chat.path });
  },
});

function AppLayoutComponent() {
  return <Outlet />;
}
