import type { ChatListResponse } from '@/types/api/chat';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// export function getChatList({
//   pageParam = 0,
// }: {
//   pageParam: number;
//   chatId: string;
// }): Promise<ChatListResponse> {
//   return api.get(apiRoutes.chat.list.path, {
//     params: { page: pageParam },
//   });
// }

export async function getChatList({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<ChatListResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const PAGE_SIZE = 20;
  // Mock data

  const mockChats = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `chat-${pageParam}-${i}`,
    name: `Chat ${pageParam * PAGE_SIZE + i}`,
    lastMessageTime: new Date(),
  }));

  const mockData: ChatListResponse = {
    chats: mockChats,
    nextPage: pageParam + 1,
    hasNextPage: pageParam < 2,
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
    queryFn: ({ pageParam }) => getChatList({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
}
