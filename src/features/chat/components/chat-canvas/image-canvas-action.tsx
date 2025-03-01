import { Eraser, Highlighter, Trash, X, XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useCanvasActions } from '@/store/canvas-store';

type ImageCanvasActionProps = React.ComponentProps<'div'> & {
  isHighlightingMode: boolean;
  toggleHighlightingMode: () => void;
  currentMode: 'highlight' | 'eraser';
  setMode: (mode: 'highlight' | 'eraser') => void;
  clearCanvas: () => void;
};

export function ImageCanvasAction({
  isHighlightingMode,
  currentMode,
  setMode,
  clearCanvas,
  toggleHighlightingMode,
}: ImageCanvasActionProps) {
  const { setCanvasMode } = useCanvasActions();

  const handleClose = () => {
    clearCanvas();

    setCanvasMode({ isOpen: false });
  };

  useKeyboardShortcut('Escape', handleClose);

  return (
    <div className='flex items-center justify-between'>
      <Button
        variant='ghost'
        size='icon'
        className='bg-background/40'
        onClick={handleClose}
      >
        <XIcon className='h-4 w-4' />
      </Button>
      <div className='flex items-center gap-1'>
        <TooltipButton
          tooltip={
            isHighlightingMode ? 'Disable highlighting' : 'Enable highlighting'
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
                setMode(currentMode === 'eraser' ? 'highlight' : 'eraser')
              }
              variant='outline'
              size='sm'
              className='bg-background/40'
            >
              <Eraser className='h-4 w-4' />
            </Toggle>

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
    </div>
  );
}
