import { useEffect, useState } from 'react';

type PopupPosition = {
  top: number;
  left: number;
};

export function useTextHighlighter() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleTextSelection = () => {
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
    };

    document.addEventListener('selectionchange', handleTextSelection);
    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, []);

  return { showPopup, popupPosition, selectedText };
}
