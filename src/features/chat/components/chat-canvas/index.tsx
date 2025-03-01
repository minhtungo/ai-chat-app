import { Eraser, Highlighter, Trash, X, XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Toggle } from '@/components/ui/toggle';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { WebcamPreview } from '@/features/chat/components/webcam-recorder/webcam-preview';
import { useImageHighlighter } from '@/features/chat/hooks/use-image-highlighter';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useCanvas, useCanvasActions } from '@/store/canvas-store';
import type { ChatMessage } from '@/types/chat';
import { useRef, useState } from 'react';

interface ChatCanvasProps {
  messages: ChatMessage[];
}

export function ChatCanvas({ messages }: ChatCanvasProps) {
  const { isOpen, type, attachment } = useCanvas();
  const { setCanvasMode } = useCanvasActions();
  const [isHighlightingMode, setIsHighlightingMode] = useState(false);

  // Refs for the image container and image element
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Use our custom hook when highlighting is enabled and we're viewing an image
  const { setMode, clearCanvas, currentMode } = useImageHighlighter({
    containerRef: imageContainerRef,
    imageRef: imageRef,
    enabled: isHighlightingMode && type === 'image',
  });

  const handleClose = () => {
    setCanvasMode({ isOpen: false });
  };

  const toggleHighlightingMode = () => {
    setIsHighlightingMode((prev) => !prev);
  };

  useKeyboardShortcut('Escape', handleClose);

  if (!isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (type) {
      case 'webcam':
        return <WebcamPreview className='h-full' />;
      case 'document':
        return (
          <div className='flex h-full items-center justify-center p-4'>
            <iframe
              src={attachment?.url}
              className='h-full w-full'
              title='Document preview'
            />
          </div>
        );
      case 'image':
        return (
          <div
            ref={imageContainerRef}
            className='relative flex h-full items-center justify-center'
          >
            <img
              ref={imageRef}
              src={attachment?.url}
              alt={attachment?.name || 'Image preview'}
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
        <ResizablePanel
          defaultSize={65}
          className='relative flex flex-col'
          minSize={30}
        >
          <div className='absolute inset-0 z-50 flex h-12 w-full items-center justify-between px-2'>
            <Button
              variant='ghost'
              size='icon'
              className='bg-background/40'
              onClick={handleClose}
            >
              <XIcon className='h-4 w-4' />
            </Button>
            {type === 'image' && (
              <div className='flex items-center gap-1'>
                <TooltipButton
                  tooltip={
                    isHighlightingMode
                      ? 'Disable highlighting'
                      : 'Enable highlighting'
                  }
                >
                  <Button
                    variant='outline'
                    size='icon'
                    className='bg-background/40'
                    onClick={toggleHighlightingMode}
                  >
                    {isHighlightingMode ? (
                      <X className='size-4' />
                    ) : (
                      <Highlighter className='size-4' />
                    )}
                  </Button>
                </TooltipButton>

                {isHighlightingMode && (
                  <div className='ml-1 flex items-center gap-1'>
                    {/* Eraser tool */}
                    <Toggle
                      pressed={currentMode === 'eraser'}
                      onPressedChange={() =>
                        setMode(
                          currentMode === 'eraser' ? 'highlight' : 'eraser',
                        )
                      }
                      variant='outline'
                      size='sm'
                      className='bg-background/40'
                    >
                      <Eraser className='h-4 w-4' />
                    </Toggle>

                    {/* Clear canvas button */}
                    <Button
                      variant='outline'
                      size='sm'
                      className='bg-background/40'
                      onClick={clearCanvas}
                    >
                      <Trash className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='h-full flex-1'>{renderContent()}</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          className='flex min-w-[350px] flex-col'
        >
          <ChatHistory messages={messages} className='px-4 pt-4 pb-10' />
          <ChatPanel className='px-4' />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
