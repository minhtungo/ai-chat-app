import { Eraser, Highlighter, Trash, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Toggle } from '@/components/ui/toggle';
import { TooltipButton } from '@/components/ui/tooltip-button';

type ImageCanvasActionProps = React.ComponentProps<'div'> & {
  isHighlightingMode: boolean;
  toggleHighlightingMode: () => void;
  currentMode: 'highlight' | 'eraser';
  setMode: (mode: 'highlight' | 'eraser') => void;
  clearCanvas: () => void;
  setHighlightSize: (size: number) => void;
};

export function ImageCanvasAction({
  isHighlightingMode,
  currentMode,
  setMode,
  clearCanvas,
  toggleHighlightingMode,
  setHighlightSize,
}: ImageCanvasActionProps) {
  return (
    <div className='flex items-center gap-1.5'>
      {isHighlightingMode && (
        <>
          <Slider
            defaultValue={[25]}
            onValueCommit={([value]) => setHighlightSize(value)}
            min={5}
            max={50}
            step={1}
            className='mr-1 w-[120px]'
          />
          <Toggle
            pressed={currentMode === 'eraser'}
            onPressedChange={() =>
              setMode(currentMode === 'eraser' ? 'highlight' : 'eraser')
            }
            variant='outline'
            size='sm'
            className='bg-background/40'
          >
            <Eraser className='size-4' />
          </Toggle>

          <Button
            variant='outline'
            size='sm'
            className='bg-background/40'
            onClick={clearCanvas}
          >
            <Trash className='h-4 w-4' />
          </Button>
        </>
      )}
      <TooltipButton
        tooltip={
          isHighlightingMode ? 'Disable highlighting' : 'Enable highlighting'
        }
      >
        <Button
          variant='outline'
          size='sm'
          className='bg-background/40 size-8'
          onClick={toggleHighlightingMode}
        >
          {isHighlightingMode ? (
            <X className='size-4' />
          ) : (
            <Highlighter className='size-4' />
          )}
        </Button>
      </TooltipButton>
    </div>
  );
}
