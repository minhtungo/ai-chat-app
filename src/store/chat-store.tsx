import type { ChatMessage } from '@/types/chat';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export type ChatState = {
  messages: ChatMessage[];
  chatName: string;
};

export type ChatActions = {
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  setChatName: (chatName: string) => void;
};

type ChatStoreProviderProps = {
  children: React.ReactNode;
  initialState?: ChatState;
};

type ChatStore = {
  state: ChatState;
  actions: ChatActions;
};

type ChatContext = StoreApi<ChatStore> | null;

type ChatStoreSelector = (state: ChatStore) => any;

const ChatStoreContext = createContext<ChatContext>(null);

export const initialChatState: ChatState = {
  messages: [],
  chatName: '',
};

export const chatStore = createStore<ChatStore>((set) => ({
  state: {
    ...initialChatState,
  },
  actions: {
    addMessage: (message) =>
      set((state) => ({
        state: { ...state.state, messages: [...state.state.messages, message] },
      })),
    setMessages: (messages) =>
      set((state) => ({
        state: { ...state.state, messages },
      })),
    clearMessages: () =>
      set((state) => ({
        state: { ...state.state, messages: initialChatState.messages },
      })),
    setChatName: (chatName: string) =>
      set((state) => ({
        state: { ...state.state, chatName },
      })),
  },
}));

export function ChatStoreProvider({ children }: ChatStoreProviderProps) {
  const [store] = useState(() => chatStore);

  return <ChatStoreContext value={store}>{children}</ChatStoreContext>;
}

function useChatStore(selector: ChatStoreSelector) {
  const store = useContext(ChatStoreContext);

  if (!store) {
    throw new Error('useChatStore must be used within a ChatStoreProvider');
  }

  return useStore(store, selector);
}

export const useChat = (): ChatState => useChatStore((state) => state.state);

export const useChatActions = (): ChatActions =>
  useChatStore((state) => state.actions);

export const useChatName = (): string =>
  useChatStore((state) => state.state.chatName);
