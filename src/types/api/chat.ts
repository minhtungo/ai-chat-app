import type { ChatMessage } from '@/types/chat';

export type ChatHistory = {
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

export type ChatList = {
  chats: ChatRoom[];
  nextOffset: number;
  hasNextPage: boolean;
};

export type PromptSuggestion = {
  name: string;
  description: string;
};
