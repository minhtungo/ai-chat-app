import { getUserQueryOptions } from '@/api/user/get-user';
import { AppSideBar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context, location }) => {
    // await context.queryClient.ensureQueryData(getUserQueryOptions());
    // if (!context.user) {
    //   throw redirect({
    //     to: paths.auth.login.path,
    //     search: {
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
});

function AppLayoutComponent() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <Outlet />
    </SidebarProvider>
  );
}
