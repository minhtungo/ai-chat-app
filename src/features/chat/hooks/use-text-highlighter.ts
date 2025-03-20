import { useEffect, useState } from 'react';

type PopupPosition = {
  top: number;
  left: number;
};

type UseTextHighlighterReturn = {
  showPopup: boolean;
  popupPosition: PopupPosition;
  selectedText: string;
  clearSelection: () => void;
};

export function useTextHighlighter(): UseTextHighlighterReturn {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        // Calculate position to appear above the selection
        const top = rect.top + scrollY - 40; // Offset to position above text
        const left = rect.left + rect.width / 2 + scrollX;

        setPopupPosition({ top, left });
        setSelectedText(selection.toString().trim());
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    // Use mouseup to detect when selection is complete
    document.addEventListener('mouseup', handleTextSelection);

    // Handle selection change events (for tracking ongoing selection)
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setSelectedText(selection.toString().trim());
      }
    });

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, []);

  const clearSelection = () => {
    window.getSelection()?.removeAllRanges();
    setSelectedText('');
    setShowPopup(false);
  };

  return { showPopup, popupPosition, selectedText, clearSelection };
}
