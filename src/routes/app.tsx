import { AppSideBar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context }) => {
    console.log('AppLayoutComponent beforeLoad', context.auth);

    // if (context.auth.isLoaded && !context.auth.isAuthenticated) {
    //   throw redirect({
    //     to: paths.auth.login.path,
    //     search: {
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <Outlet />
    </SidebarProvider>
  );
}
