import type { ChatMessage } from '@/types/chat';

export type ChatHistoryResponse = {
  name: string;
  messages: ChatMessage[];
  nextOffset: number;
  hasNextPage: boolean;
};

export type ChatRoom = {
  id: string;
  name: string;
  lastMessageTime: Date;
};

export type ChatListResponse = {
  chats: ChatRoom[];
  nextOffset: number;
  hasNextPage: boolean;
};

export type PromptSuggestion = {
  name: string;
  description: string;
};
