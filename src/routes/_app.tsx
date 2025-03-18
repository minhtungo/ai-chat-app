import { AppSideBar } from '@/components/app-sidebar';
import { ChatSidebar } from '@/components/chat-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { appRoutes } from '@/config/routes';
import { ChatHeader } from '@/features/chat/components/chat-history/chat-header';
import { ChatPanel } from '@/features/chat/components/chat-history/chat-panel';
import { CanvasStoreProvider } from '@/store/canvas-store';
import { ChatStoreProvider } from '@/store/chat-store';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    console.log('beforeLoad _app');
    if (!context.auth.isAuthenticated) {
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
        <ChatStoreProvider>
          <CanvasStoreProvider>
            <ChatSidebar />
            <main className='relative flex h-svh w-full flex-col'>
              <ChatHeader className='px-4 py-2' />
              <Outlet />
              <ChatPanel className='px-4' />
            </main>
          </CanvasStoreProvider>
        </ChatStoreProvider>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
