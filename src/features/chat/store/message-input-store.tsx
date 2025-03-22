import { chatStore } from '@/features/chat/store/chat-store';
import type { Attachment } from '@/features/chat/types';
import { convertFileToAttachment } from '@/utils/chat';
import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
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
  addAttachment: (file: File | undefined) => void;
  removeAttachment: (id: string) => void;
  addMathExpression: (expression: string) => void;
  removeMathExpression: (index: number) => void;
  submitMessage: (initialMessage?: string) => void;
  clearMessageInput: () => void;
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
    clearMessageInput: () => {
      set(() => ({
        state: { ...initialMessageInputState },
      }));
    },
    setMessage: (message: string) => {
      set((state) => ({
        state: { ...state.state, message },
      }));
    },
    submitMessage: (initialMessage?: string) => {
      const message = initialMessage || get().state.message;
      const attachments = get().state.attachments;
      const mathExpressions = get().state.mathExpressions;

      if (
        !message.trim() &&
        attachments.length === 0 &&
        mathExpressions.length === 0
      ) {
        return;
      }

      const combinedMessage = [message, ...mathExpressions]
        .filter((text) => text.trim())
        .join('\n\n');

      set(() => ({
        state: {
          ...initialMessageInputState,
        },
      }));

      chatStore
        .getState()
        .actions.sendChatMessage(combinedMessage, attachments);
    },
    addAttachment: (file: File | undefined) => {
      if (file) {
        const newAttachments = [convertFileToAttachment(file)];
        set((state) => ({
          state: {
            ...state.state,
            attachments: [...state.state.attachments, ...newAttachments],
          },
        }));
      } else {
        toast.error('No file provided');
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

export function useMessageInputStoreActions() {
  return useMessageInputStore((state) => state.actions);
}
