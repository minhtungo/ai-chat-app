import type { ChatHistoryResponse } from '@/types/api/chat';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// export function getChatHistory({
//   offset = 0,
//   chatId,
// }: {
//   offset: number;
//   chatId: string;
// }): Promise<ChatHistoryResponse> {
//   return api.get(apiRoutes.chat.history.path, {
//     params: { page: pageParam, chatId },
//   });
// }

export async function getChatHistory({
  offset = 0,
  chatId,
}: {
  offset: number;
  chatId: string;
}): Promise<ChatHistoryResponse> {
  // await new Promise((resolve) => setTimeout(resolve, 500));

  const PAGE_SIZE = 20;
  // Mock data

  const mockMessages = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `hist-${offset}-${i}`,
    content: `Historical message ${offset * PAGE_SIZE + i} for room ${chatId}`,
    role: i % 2 === 0 ? ('user' as const) : ('assistant' as const),
    createdAt: new Date(),
    attachments: [],
  }));

  const mockData: ChatHistoryResponse = {
    name: `Chat ${chatId}`,
    messages: mockMessages,
    nextOffset: offset + PAGE_SIZE,
    hasNextPage: offset + PAGE_SIZE < 60,
  };

  // Return a promise that resolves with the mock data
  return Promise.resolve(mockData);
}

export function getChatHistoryQueryOptions(chatId: string) {
  return {
    queryKey: ['chatHistory', chatId],
  };
}

export function useChatHistory(chatId: string) {
  return useSuspenseInfiniteQuery({
    queryKey: ['chatHistory', chatId],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getChatHistory({ offset: pageParam, chatId }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextOffset : undefined,
  });
}
