import type { ChatHistory } from '@/types/api/chat';
import { queryOptions, useSuspenseInfiniteQuery } from '@tanstack/react-query';

// export function getChatHistory({
//   offset = 0,
//   chatId,
// }: {
//   offset: number;
//   chatId: string;
// }): Promise<ChatHistoryResponse> {
//   return privateApi.get(apiRoutes.chat.history.path, {
//     params: { page: pageParam, chatId },
//   });
// }

export async function getChatHistory({
  offset = 0,
  chatId,
}: {
  offset: number;
  chatId: string;
}): Promise<ChatHistory> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const PAGE_SIZE = 30;
  // Mock data

  const mockMessages = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `hist-${offset}-${i}`,
    content: `Historical message ${offset * PAGE_SIZE + i} for room ${chatId}`,
    role: i % 2 === 0 ? ('user' as const) : ('assistant' as const),
    createdAt: new Date(),
    attachments: [],
  }));

  const mockData: ChatHistory = {
    name: `Chat ${chatId}`,
    messages: mockMessages,
    nextOffset: offset + PAGE_SIZE,
    hasNextPage: offset + PAGE_SIZE < 120,
  };

  return Promise.resolve(mockData);
}

export function getChatHistoryQueryOptions(chatId: string) {
  return queryOptions({
    queryKey: ['chatHistory', chatId],
  });
}

export function useChatHistory(chatId: string) {
  return useSuspenseInfiniteQuery({
    queryKey: getChatHistoryQueryOptions(chatId).queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getChatHistory({ offset: pageParam, chatId }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextOffset : undefined,
  });
}
