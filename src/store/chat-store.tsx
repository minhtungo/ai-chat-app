import type { ChatMessage } from '@/types/chat';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export type ChatState = {
  messages: ChatMessage[];
  chatName: string;
  isStreaming: boolean;
};

export type ChatMessageActions = {
  addMessage: (message: ChatMessage) => void;
  updateStreamingResponse: (content: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  setChatName: (chatName: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
};

type ChatStoreProviderProps = {
  children: React.ReactNode;
  initialState?: ChatState;
};

type ChatStore = {
  state: ChatState;
  messageActions: ChatMessageActions;
};

type ChatContext = StoreApi<ChatStore> | null;

type ChatStoreSelector = (state: ChatStore) => any;

const ChatStoreContext = createContext<ChatContext>(null);

export const initialChatState: ChatState = {
  messages: [],
  chatName: '',
  isStreaming: false,
};

export const chatStore = createStore<ChatStore>((set) => ({
  state: {
    ...initialChatState,
  },
  messageActions: {
    addMessage: (message) =>
      set((state) => ({
        state: { ...state.state, messages: [...state.state.messages, message] },
      })),
    updateStreamingResponse: (content) =>
      set((state) => {
        const messages = [...state.state.messages];
        if (messages.length > 0) {
          const lastMessage = { ...messages[messages.length - 1] };
          lastMessage.content = content;
          messages[messages.length - 1] = lastMessage;
        }
        return {
          state: { ...state.state, messages },
        };
      }),
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
    setIsStreaming: (isStreaming: boolean) =>
      set((state) => ({
        state: { ...state.state, isStreaming },
      })),
  },
}));

export function ChatStoreProvider({ children }: ChatStoreProviderProps) {
  const [store] = useState(() => chatStore);

  return <ChatStoreContext value={store}>{children}</ChatStoreContext>;
}

export function useChatStore(selector: ChatStoreSelector) {
  const store = useContext(ChatStoreContext);

  if (!store) {
    throw new Error('useChatStore must be used within a ChatStoreProvider');
  }

  return useStore(store, selector);
}

export const useChatStoreIsStreaming = (): ChatState['isStreaming'] =>
  useChatStore((state) => state.state.isStreaming);
export const useChatStoreMessages = (): ChatState['messages'] =>
  useChatStore((state) => state.state.messages);
export const useChatStoreChatName = (): ChatState['chatName'] =>
  useChatStore((state) => state.state.chatName);

export const useChatStoreSetIsStreaming =
  (): ChatMessageActions['setIsStreaming'] =>
    useChatStore((state) => state.messageActions.setIsStreaming);

export const useChatStoreSetChatName = (): ChatMessageActions['setChatName'] =>
  useChatStore((state) => state.messageActions.setChatName);

export const useChatStoreAddMessage = (): ChatMessageActions['addMessage'] =>
  useChatStore((state) => state.messageActions.addMessage);

export const useChatStoreSetMessages = (): ChatMessageActions['setMessages'] =>
  useChatStore((state) => state.messageActions.setMessages);

export const useChatStoreClearMessages =
  (): ChatMessageActions['clearMessages'] =>
    useChatStore((state) => state.messageActions.clearMessages);

export const useChatStoreUpdateStreamingResponse =
  (): ChatMessageActions['updateStreamingResponse'] =>
    useChatStore((state) => state.messageActions.updateStreamingResponse);
