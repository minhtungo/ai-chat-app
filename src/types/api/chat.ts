import type { ChatMessage } from '@/types/chat';

export type ChatHistoryResponse = {
  messages: ChatMessage[];
  nextPage: number;
  hasNextPage: boolean;
};

export type ChatRoom = {
  id: string;
  name: string;
  lastMessageTime: Date;
};

export type ChatListResponse = {
  chats: ChatRoom[];
  nextPage: number;
  hasNextPage: boolean;
};
