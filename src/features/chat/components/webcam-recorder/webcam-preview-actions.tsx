import { Button } from '@/components/ui/button';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useCanvasActions } from '@/store/canvas-store';
import { cn } from '@/utils/cn';
import { XIcon } from 'lucide-react';

export function WebcamPreviewActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { setCanvasMode } = useCanvasActions();

  const handleClose = () => {
    setCanvasMode({ isOpen: false });
  };

  useKeyboardShortcut('Escape', handleClose);

  return (
    <div
      {...props}
      className={cn('flex items-center justify-between', className)}
    >
      <Button
        variant='ghost'
        size='icon'
        className='bg-background/40'
        onClick={handleClose}
      >
        <XIcon className='h-4 w-4' />
      </Button>
    </div>
  );
}
