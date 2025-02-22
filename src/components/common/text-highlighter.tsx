import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';
import type React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

interface PopupPosition {
  top: number;
  left: number;
}

export default function TextHighlighter({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      // Calculate position to appear above the selection
      const top = rect.top + scrollY - 40; // Increased offset to position higher above text
      const left = rect.left + rect.width / 2;

      setPopupPosition({ top, left });
      setSelectedText(selection.toString());
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, [handleTextSelection]);

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
