import { XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { useCanvasActions } from '@/store/canvas-store';
import { cn } from '@/utils/cn';

type CanvasActionProps = React.ComponentProps<'div'> & {
  actions?: React.ReactNode;
  onCanvasClose?: () => void;
};

export function CanvasAction({
  className,
  actions,
  onCanvasClose,
  ...props
}: CanvasActionProps) {
  const { setCanvasMode } = useCanvasActions();

  const handleClose = () => {
    if (onCanvasClose) {
      onCanvasClose();
    }
    setCanvasMode({ isOpen: false });
  };

  useKeyboardShortcut('Escape', handleClose);

  return (
    <div
      {...props}
      className={cn(
        'absolute inset-0 z-50 flex h-12 w-full items-center justify-between px-2',
        className,
      )}
    >
      <Button
        variant='ghost'
        size='icon'
        className='bg-background/40'
        onClick={handleClose}
      >
        <XIcon className='h-4 w-4' />
      </Button>

      {actions && actions}
    </div>
  );
}
