import type { ChatListResponse } from '@/types/api/chat';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// export function getChatList({
//   offset = 0,
// }: {
//   offset: number;
//   chatId: string;
// }): Promise<ChatListResponse> {
//   return api.get(apiRoutes.chat.list.path, {
//     params: { page: pageParam },
//   });
// }

export async function getChatList({
  offset = 0,
}: {
  offset: number;
}): Promise<ChatListResponse> {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  const PAGE_SIZE = 20;
  // Mock data

  const mockChats = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `chat-${offset}-${i}`,
    name: `Chat ${offset * PAGE_SIZE + i}`,
    lastMessageTime: new Date(),
  }));

  const mockData: ChatListResponse = {
    chats: mockChats,
    nextOffset: offset + PAGE_SIZE,
    hasNextPage: offset + PAGE_SIZE < 60,
  };

  // Return a promise that resolves with the mock data
  return Promise.resolve(mockData);
}

export function getChatListQueryOptions() {
  return {
    queryKey: ['chatList'],
  };
}

export function useChatList() {
  return useSuspenseInfiniteQuery({
    ...getChatListQueryOptions(),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getChatList({ offset: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextOffset : undefined,
  });
}
