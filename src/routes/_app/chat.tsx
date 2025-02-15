import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/components/chat-sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat')({
  component: ChatLayoutComponent,
});

function ChatLayoutComponent() {
  return (
    <>
      <ChatSidebar />
      <main className='w-full'>
        <div className='p-2 border-b border-border w-full'>
          <SidebarTrigger />
        </div>
        <div className='p-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
