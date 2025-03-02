import { Button } from '@/components/ui/button';
import { useTextHighlighter } from '@/hooks/use-text-highligher';
import { Quote } from 'lucide-react';
import type React from 'react';
import { memo } from 'react';

export function TextHighlighter({ children }: { children: React.ReactNode }) {
  const { showPopup, popupPosition } = useTextHighlighter();

  return (
    <>
      {children}
      {showPopup && (
        <div
          className='border-input bg-background fixed z-50 flex -translate-x-1/2 -translate-y-1/6 transform items-center rounded-md border p-1 shadow-xs'
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <Button
            variant='ghost'
            size='sm'
            className='size-auto h-auto p-1 text-sm'
          >
            <Quote className='size-3' />
            Quote
          </Button>

          <div className='bg-background border-input absolute bottom-[-4px] left-1/2 -ml-1 h-2 w-2 rotate-45 transform border-r border-b' />
        </div>
      )}
    </>
  );
}

export const MemoizedHighlightedContent = memo(
  function MemoizedHighlightedContent({ content }: { content: string }) {
    return <TextHighlighter>{content}</TextHighlighter>;
  },
);
