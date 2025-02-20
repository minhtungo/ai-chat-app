import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChatSidebar } from '@/components/chat-sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import ChatPanel from '@/features/chat/components/chat-panel';
import ChatHistory from '@/features/chat/components/chat-history';

export const Route = createFileRoute('/_app/chat')({
  component: ChatLayoutComponent,
});

function ChatLayoutComponent() {
  return (
    <>
      <ChatSidebar />
      <main className='flex flex-col relative w-full h-svh'>
        <div className='p-2 border-b border-border w-full'>
          <SidebarTrigger />
        </div>
        <Outlet />
        <ChatPanel />
      </main>
    </>
  );
}
