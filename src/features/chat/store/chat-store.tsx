import { streamChatCompletion } from '@/features/chat/api/stream-chat-completion';
import type { Attachment, ChatMessage, ChatMode } from '@/features/chat/types';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export type ChatState = {
  messages: ChatMessage[];
  chatName: string;
  isStreaming: boolean;
  mode: ChatMode;
};

export type ChatMessageActions = {
  addMessage: (message: ChatMessage) => void;
  updateStreamingResponse: (content: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
  setChatName: (chatName: string) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  sendChatMessage: (message: string, attachments?: Attachment[]) => void;
  setMode: (mode: ChatMode) => void;
};

type ChatStoreProviderProps = {
  children: React.ReactNode;
  initialState?: ChatState;
};

type ChatStore = {
  state: ChatState;
  actions: ChatMessageActions;
};

type ChatContext = StoreApi<ChatStore> | null;

type ChatStoreSelector = (state: ChatStore) => any;

const ChatStoreContext = createContext<ChatContext>(null);

export const initialChatState: ChatState = {
  messages: [],
  chatName: '',
  isStreaming: false,
  mode: 'guide-mode',
};

export const chatStore = createStore<ChatStore>((set, get) => ({
  state: {
    ...initialChatState,
  },
  actions: {
    addMessage: (message) => {
      console.log('addMessage', message);
      const messages = [...get().state.messages, message];
      set((state) => ({
        state: { ...state.state, messages },
      }));
    },
    sendChatMessage: (message: string, attachments: Attachment[] = []) => {
      const chatHistory = get().state.messages;

      // Add user message
      const addMessage = get().actions.addMessage;

      addMessage({
        id: crypto.randomUUID(),
        content: message,
        role: 'user',
        createdAt: new Date(),
        attachments,
      });

      // Add assistant placeholder
      addMessage({
        id: crypto.randomUUID(),
        content: '',
        role: 'assistant',
        createdAt: new Date(),
        attachments: [],
      });

      // Handle streaming
      const updateStreamingResponse = get().actions.updateStreamingResponse;
      const setIsStreaming = get().actions.setIsStreaming;

      setIsStreaming(true);
      let accumulatedResponse = '';

      // Process response
      streamChatCompletion(
        message,
        chatHistory,
        (chunk) => {
          accumulatedResponse += chunk;
          updateStreamingResponse(accumulatedResponse);
        },
        () => {
          setIsStreaming(false);
        },
      ).catch((error) => {
        console.error('Chat completion error:', error);
        updateStreamingResponse(
          'Sorry, there was an error processing your request.',
        );
        setIsStreaming(false);
      });
    },
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
    setMode: (mode: ChatMode) =>
      set((state) => ({
        state: { ...state.state, mode },
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

export function useChatStoreIsStreaming(): ChatState['isStreaming'] {
  return useChatStore((state) => state.state.isStreaming);
}

export function useChatStoreMode(): ChatState['mode'] {
  return useChatStore((state) => state.state.mode);
}

export function useChatStoreMessages(): ChatState['messages'] {
  return useChatStore((state) => state.state.messages);
}

export function useChatStoreChatName(): ChatState['chatName'] {
  return useChatStore((state) => state.state.chatName);
}

export function useChatStoreActions(): ChatMessageActions {
  return useChatStore((state) => state.actions);
}
