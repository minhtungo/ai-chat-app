import { AppSideNav } from '@/components/app-side-nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <SidebarProvider>
      <AppSideNav />
      <Outlet />
    </SidebarProvider>
  );
}
