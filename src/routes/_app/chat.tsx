import { ChatSidebar } from '@/components/chat-sidebar';
import {
  getChatList,
  getChatListQueryOptions,
} from '@/features/chat/api/chat-list';
import {
  getPromptSuggestions,
  getPromptSuggestionsQueryOptions,
} from '@/features/chat/api/suggestions';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { ChatStoreProvider } from '@/store/chat-store';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/chat')({
  component: ChatLayoutComponent,
  loader: ({ context }) => {
    context.queryClient.ensureInfiniteQueryData({
      queryKey: getChatListQueryOptions().queryKey,
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getChatList({ offset: pageParam }),
    });

    context.queryClient.ensureQueryData({
      queryKey: getPromptSuggestionsQueryOptions().queryKey,
      queryFn: getPromptSuggestions,
    });
  },
});

function ChatLayoutComponent() {
  return (
    <ChatStoreProvider>
      <ChatSidebar />
      <main className='relative flex h-svh w-full flex-col'>
        <ChatHeader className='px-4 py-2' />
        <Outlet />
        <ChatPanel className='px-4' />
      </main>
    </ChatStoreProvider>
  );
}
