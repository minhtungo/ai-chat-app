import { ColorPicker } from '@/components/common/color-picker';
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
  highlightColor: string;
  setHighlightColor: (color: string) => void;
  highlightSize: number;
};

export function ImageCanvasAction({
  isHighlightingMode,
  currentMode,
  highlightColor,
  setHighlightColor,
  setMode,
  clearCanvas,
  toggleHighlightingMode,
  setHighlightSize,
  highlightSize,
}: ImageCanvasActionProps) {
  return (
    <div className='flex items-center gap-1.5'>
      {isHighlightingMode && (
        <>
          <Slider
            value={[highlightSize]}
            onValueCommit={([value]) => setHighlightSize(value)}
            min={10}
            max={75}
            step={1}
            className='mr-1 w-[120px]'
          />
          <ColorPicker
            color={highlightColor}
            setColor={setHighlightColor}
            className='mr-1'
          />
          <TooltipButton tooltip='Eraser'>
            <Toggle
              pressed={currentMode === 'eraser'}
              onPressedChange={() =>
                setMode(currentMode === 'eraser' ? 'highlight' : 'eraser')
              }
              variant='outline'
              size='sm'
              className='cursor-pointer'
            >
              <Eraser className='size-4' />
            </Toggle>
          </TooltipButton>

          <TooltipButton tooltip='Clear'>
            <Button variant='outline' size='sm' onClick={clearCanvas}>
              <Trash className='h-4 w-4' />
            </Button>
          </TooltipButton>
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
