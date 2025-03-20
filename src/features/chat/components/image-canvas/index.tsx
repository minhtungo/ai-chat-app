import { CanvasActions } from '@/features/canvas/components/canvas-actions';
import { ImageCanvasAction } from '@/features/chat/components/image-canvas/image-canvas-action';
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
  const [highlightSize, setHighlightSize] = useState(30);
  const [highlightColor, setHighlightColor] = useState('#4d4dff');

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const toggleHighlightingMode = () => {
    setIsHighlightingMode((prev) => !prev);
  };

  const { setMode, clearCanvas, currentMode } = useImageHighlighter({
    containerRef,
    imageRef,
    enabled: isHighlightingMode,
    highlightSize,
    highlightColor,
  });

  return (
    <>
      <CanvasActions
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
            highlightSize={highlightSize}
          />
        }
        className='absolute inset-0 z-50 flex h-12 w-full px-2'
      />
      <div className='flex h-full flex-1 items-center justify-center'>
        <div
          ref={containerRef}
          className={cn('relative bg-blue-500', className)}
          {...props}
        >
          <img
            ref={imageRef}
            src={attachment?.url}
            alt={attachment?.name || 'Image preview'}
            className='aspect-auto w-full object-contain'
          />
        </div>
      </div>
    </>
  );
}
