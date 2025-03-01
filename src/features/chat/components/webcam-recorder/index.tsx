import { Camera } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useCanvasActions } from '@/store/canvas-store';
import { cn } from '@/utils/cn';

type WebcamRecorderProps = {};

export function WebcamRecorder({}: WebcamRecorderProps) {
  const { setCanvasMode } = useCanvasActions();
  return (
    <Button
      onClick={() => {
        setCanvasMode({
          isOpen: true,
          type: 'webcam',
          attachment: null,
        });
      }}
      variant='ghost'
      type='button'
      size='icon'
      className={cn('size-8 rounded-full')}
    >
      <Camera className='size-4.5' />
    </Button>
  );
}
