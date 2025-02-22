import type { ChatHistoryResponse } from '@/types/api/chat';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// export function getChatHistory({
//   pageParam = 0,
//   chatId,
// }: {
//   pageParam: number;
//   chatId: string;
// }): Promise<ChatHistoryResponse> {
//   return api.get(apiRoutes.chat.history.path, {
//     params: { page: pageParam, chatId },
//   });
// }

export async function getChatHistory({
  pageParam = 0,
  chatId,
}: {
  pageParam: number;
  chatId: string;
}): Promise<ChatHistoryResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const PAGE_SIZE = 20;
  // Mock data

  const mockMessages = Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `hist-${pageParam}-${i}`,
    content: `Historical message ${pageParam * PAGE_SIZE + i} for room ${chatId}`,
    role: i % 2 === 0 ? ('user' as const) : ('assistant' as const),
    createdAt: new Date(),
    attachments: [],
  }));

  const mockData: ChatHistoryResponse = {
    messages: mockMessages,
    nextPage: pageParam + 1,
    hasNextPage: pageParam < 2,
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
    queryFn: ({ pageParam }) => getChatHistory({ pageParam, chatId }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });
}
