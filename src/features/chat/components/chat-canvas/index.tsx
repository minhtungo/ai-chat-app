import { XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { WebcamPreview } from '@/features/chat/components/webcam-recorder/webcam-preview';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useChat, useChatCanvasActions } from '@/store/chat-store';
import type { ChatMessage } from '@/types/chat';

interface ChatCanvasProps {
  messages: ChatMessage[];
}

export function ChatCanvas({ messages }: ChatCanvasProps) {
  const { canvasMode } = useChat();
  const { setCanvasMode } = useChatCanvasActions();

  const handleClose = () => {
    setCanvasMode({ isOpen: false });
  };

  useKeyboardShortcut('Escape', handleClose);

  if (!canvasMode.isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (canvasMode.type) {
      case 'webcam':
        return (
          <WebcamPreview
            ref={
              canvasMode.metadata?.videoRef as React.RefObject<HTMLVideoElement>
            }
            isRecording={canvasMode.metadata?.isRecording || false}
            duration={canvasMode.metadata?.duration || 0}
            className='h-full'
          />
        );
      case 'document':
        return (
          <div className='flex h-full items-center justify-center p-4'>
            <iframe
              src={canvasMode.attachment?.url}
              className='h-full w-full'
              title='Document preview'
            />
          </div>
        );
      case 'image':
        return (
          <div className='flex h-full items-center justify-center'>
            <img
              src={canvasMode.attachment?.url}
              alt={canvasMode.attachment?.name || 'Image preview'}
              className='max-h-full max-w-full object-contain'
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-background fixed inset-0 z-50'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={70} className='relative flex flex-col'>
          <div className='absolute inset-0 z-[99] flex h-12 w-full items-center justify-between px-4'>
            <Button variant='ghost' size='icon' onClick={handleClose}>
              <XIcon className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex-1'>{renderContent()}</div>
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
