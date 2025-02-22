import type { ChatMessage } from '@/types/chat';

export type ChatHistoryResponse = {
  messages: ChatMessage[];
  nextPage: number;
  hasNextPage: boolean;
};
