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
  const [highlightSize, setHighlightSize] = useState(25);
  const [highlightColor, setHighlightColor] = useState('#4d4dff');

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const toggleHighlightingMode = () => {
    setIsHighlightingMode((prev) => !prev);
  };

  const { setMode, clearCanvas, currentMode } = useImageHighlighter({
    containerRef: imageContainerRef,
    imageRef: imageRef,
    enabled: isHighlightingMode,
    highlightSize,
    highlightColor,
  });

  return (
    <>
      <CanvasAction
        actions={
          <ImageCanvasAction
            highlightColor={highlightColor}
            setHighlightColor={setHighlightColor}
            isHighlightingMode={isHighlightingMode}
            toggleHighlightingMode={toggleHighlightingMode}
            currentMode={currentMode}
            setMode={setMode}
            clearCanvas={clearCanvas}
            setHighlightSize={setHighlightSize}
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
