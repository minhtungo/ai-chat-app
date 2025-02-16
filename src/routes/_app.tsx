import { AppSideBar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { paths } from '@/config/paths';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  // beforeLoad: ({ context, location }) => {
  //   console.log('app context', context);
  //   if (!context.user) {
  //     throw redirect({
  //       to: paths.auth.login.path,
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
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
