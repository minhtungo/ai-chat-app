import { streamChatCompletion } from '@/features/chat/api/stream-chat-completion';
import { chatStore } from '@/store/chat-store';
import type { Attachment } from '@/types/chat';
import { convertFileToAttachment } from '@/utils/chat';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

type MessageInputState = {
  message: string;
  attachments: Attachment[];
  isMathKeyboardOpen: boolean;
  mathExpressions: string[];
};

type MessageInputActions = {
  setMessage: (message: string) => void;
  toggleMathKeyboard: () => void;
  addAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (id: string) => void;
  addMathExpression: (expression: string) => void;
  removeMathExpression: (index: number) => void;
  sendMessage: (initialMessage?: string) => void;
};

type MessageInputStore = {
  state: MessageInputState;
  actions: MessageInputActions;
};

const MessageInputStoreContext =
  createContext<StoreApi<MessageInputStore> | null>(null);

export const initialMessageInputState: MessageInputState = {
  message: '',
  attachments: [],
  isMathKeyboardOpen: false,
  mathExpressions: [],
};

export const messageInputStore = createStore<MessageInputStore>((set, get) => ({
  state: {
    ...initialMessageInputState,
  },
  actions: {
    setMessage: (message: string) => {
      set((state) => ({
        state: { ...state.state, message },
      }));
    },
    sendMessage: async (initialMessage?: string) => {
      const message = initialMessage || get().state.message;
      const attachments = get().state.attachments;
      if (!message.trim() && attachments.length === 0) {
        return;
      }

      const mathExpressions = get().state.mathExpressions;

      const combinedMessage = [message, ...mathExpressions]
        .filter((text) => text.trim())
        .join('\n\n');

      set(() => ({
        state: {
          ...initialMessageInputState,
        },
      }));

      const addMessage = chatStore.getState().messageActions.addMessage;

      const updateStreamingResponse =
        chatStore.getState().messageActions.updateStreamingResponse;

      const setIsStreaming = chatStore.getState().messageActions.setIsStreaming;

      const messages = chatStore.getState().state.messages;

      addMessage({
        id: crypto.randomUUID(),
        content: combinedMessage,
        role: 'user',
        createdAt: new Date(),
        attachments,
      });

      // Add assistant message placeholder
      addMessage({
        id: crypto.randomUUID(),
        content: '',
        role: 'assistant',
        createdAt: new Date(),
        attachments: [],
      });

      setIsStreaming(true);

      let accumulatedResponse = '';

      try {
        await streamChatCompletion(
          message,
          messages,
          (chunk) => {
            accumulatedResponse += chunk;
            updateStreamingResponse(accumulatedResponse);
          },
          () => {
            setIsStreaming(false);
          },
        );
      } catch (error) {
        console.error('Chat completion error:', error);
        updateStreamingResponse(
          'Sorry, there was an error processing your request.',
        );
        setIsStreaming(false);
      }
    },
    addAttachment: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newAttachments = Array.from(e.target.files).map((file) =>
          convertFileToAttachment(file),
        );
        set((state) => ({
          state: {
            ...state.state,
            attachments: [...state.state.attachments, ...newAttachments],
          },
        }));
      }
    },
    removeAttachment: (id: string) => {
      set((state) => ({
        state: {
          ...state.state,
          attachments: state.state.attachments.filter(
            (attachment) => attachment.id !== id,
          ),
        },
      }));
    },
    toggleMathKeyboard: () =>
      set((state) => ({
        state: {
          ...state.state,
          isMathKeyboardOpen: !state.state.isMathKeyboardOpen,
        },
      })),
    addMathExpression: (expression: string) => {
      set((state) => ({
        state: {
          ...state.state,
          mathExpressions: [...state.state.mathExpressions, expression],
        },
      }));
    },
    removeMathExpression: (index: number) => {
      set((state) => ({
        state: {
          ...state.state,
          mathExpressions: state.state.mathExpressions.filter(
            (_, i) => i !== index,
          ),
        },
      }));
    },
  },
}));

export function MessageInputProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => messageInputStore);
  return (
    <MessageInputStoreContext.Provider value={store}>
      {children}
    </MessageInputStoreContext.Provider>
  );
}

export function useMessageInputStore<T>(
  selector: (state: MessageInputStore) => T,
): T {
  const store = useContext(MessageInputStoreContext);

  if (!store) {
    throw new Error(
      'useMessageInputStore must be used within a MessageInputProvider',
    );
  }

  return useStore(store, selector);
}
