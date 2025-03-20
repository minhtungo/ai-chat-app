import { AppSideBar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { appRoutes } from '@/config/routes';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    console.log('beforeLoad _app');
    if (!context.isAuthenticated) {
      throw redirect({ to: appRoutes.auth.signIn.path });
    }
  },
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <>
      <SidebarProvider>
        <AppSideBar />
        <Outlet />
      </SidebarProvider>
      <Toaster />
    </>
  );
}
