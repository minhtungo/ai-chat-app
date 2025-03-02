import type { Attachment } from '@/types/chat';
import { createContext, useContext, useState } from 'react';
import { type StoreApi, createStore, useStore } from 'zustand';

export type CanvasContentType = 'webcam' | 'document' | 'image' | null;

export type CanvasState = {
  isOpen: boolean;
  type: CanvasContentType;
  attachment: Attachment | null;
};

export type CanvasActions = {
  closeCanvas: () => void;
  setCanvasMode: (params: {
    isOpen: boolean;
    type?: CanvasContentType | null;
    attachment?: Attachment | null;
  }) => void;
};

type CanvasStoreProviderProps = {
  children: React.ReactNode;
  initialState?: CanvasState;
};

type CanvasStore = {
  state: CanvasState;
  actions: CanvasActions;
};

type CanvasContext = StoreApi<CanvasStore> | null;

type CanvasStoreSelector = (state: CanvasStore) => any;

const CanvasStoreContext = createContext<CanvasContext>(null);

export const initialCanvasState: CanvasState = {
  isOpen: false,
  type: null,
  attachment: null,
};

export const canvasStore = createStore<CanvasStore>((set) => ({
  state: {
    ...initialCanvasState,
  },
  actions: {
    closeCanvas: () =>
      set(() => ({
        state: { ...initialCanvasState },
      })),
    setCanvasMode: (params) =>
      set((state) => ({
        state: { ...state.state, ...params },
      })),
  },
}));

export function CanvasStoreProvider({ children }: CanvasStoreProviderProps) {
  const [store] = useState(() => canvasStore);

  return <CanvasStoreContext value={store}>{children}</CanvasStoreContext>;
}

function useCanvasStore(selector: CanvasStoreSelector) {
  const store = useContext(CanvasStoreContext);

  if (!store) {
    throw new Error('useChatStore must be used within a ChatStoreProvider');
  }

  return useStore(store, selector);
}

export const useCanvas = (): CanvasState =>
  useCanvasStore((state) => state.state);

export const useCanvasActions = (): CanvasActions =>
  useCanvasStore((state) => state.actions);
