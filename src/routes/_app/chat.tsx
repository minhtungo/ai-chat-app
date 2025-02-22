import { getChatList, getChatListQueryOptions } from '@/api/chat/chat-list';
import { ChatSidebar } from '@/components/chat-sidebar';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { ChatStoreProvider } from '@/store/chat';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat')({
  component: ChatLayoutComponent,
  beforeLoad: async ({ context }) => {
    await context.queryClient.prefetchInfiniteQuery({
      queryKey: getChatListQueryOptions().queryKey,
      queryFn: getChatList,
      initialPageParam: 0,
    });
  },
});

function ChatLayoutComponent() {
  return (
    <ChatStoreProvider>
      <ChatSidebar />
      <main className='relative flex h-svh w-full flex-col'>
        <ChatHeader className='p-2' />
        <Outlet />
        <ChatPanel className='px-4' />
      </main>
    </ChatStoreProvider>
  );
}
