import { XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useChat, useChatCanvasActions } from '@/store/chat-store';
import type { ChatMessage } from '@/types/chat';

type ChatCanvasProps = {
  messages: ChatMessage[];
};

export function ChatCanvas({ messages }: ChatCanvasProps) {
  const { closeCanvas } = useChatCanvasActions();
  const { canvasMode } = useChat();
  useKeyboardShortcut('Escape', closeCanvas);

  if (!canvasMode.isOpen) {
    return null;
  }

  return (
    <div className='bg-background fixed inset-0 z-50'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={70} className='flex flex-col'>
          <div className='flex justify-between p-4'>
            <Button variant='ghost' size='icon' onClick={closeCanvas}>
              <XIcon className='h-4 w-4' />
            </Button>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={30}
          className='flex min-w-[350px] flex-col pt-4'
        >
          <ChatHistory messages={messages} className='px-4 pb-10' />
          <ChatPanel className='px-4' />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
