import { CanvasAction } from '@/features/chat/components/chat-canvas/canvas-action';
import { ImageCanvasAction } from '@/features/chat/components/chat-canvas/image-canvas-action';
import { useImageHighlighter } from '@/features/chat/hooks/use-image-highlighter';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';

type ImageCanvasProps = React.ComponentProps<'div'> & {
  attachment: Attachment | null;
};

export function ImageCanvas({
  className,
  attachment,
  ...props
}: ImageCanvasProps) {
  const [isHighlightingMode, setIsHighlightingMode] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const toggleHighlightingMode = () => {
    setIsHighlightingMode((prev) => !prev);
  };

  const { setMode, clearCanvas, currentMode } = useImageHighlighter({
    containerRef: imageContainerRef,
    imageRef: imageRef,
    enabled: isHighlightingMode,
  });

  return (
    <>
      <CanvasAction
        actions={
          <ImageCanvasAction
            isHighlightingMode={isHighlightingMode}
            toggleHighlightingMode={toggleHighlightingMode}
            currentMode={currentMode}
            setMode={setMode}
            clearCanvas={clearCanvas}
          />
        }
        className='absolute inset-0 z-50 flex h-12 w-full px-2'
      />
      <div className='h-full flex-1'>
        <div
          ref={imageContainerRef}
          className={cn(
            'relative flex h-full items-center justify-center',
            className,
          )}
          {...props}
        >
          <img
            ref={imageRef}
            src={attachment?.url}
            alt={attachment?.name || 'Image preview'}
            className='max-h-full max-w-full object-contain'
          />
        </div>
      </div>
    </>
  );
}
