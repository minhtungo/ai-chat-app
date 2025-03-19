import { XIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useCanvasActions } from '@/features/canvas/store/canvas-store';
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut';
import { cn } from '@/utils/cn';

type CanvasActionsProps = React.ComponentProps<'div'> & {
  actions?: React.ReactNode;
  onCanvasClose?: () => void;
};

export function CanvasActions({
  className,
  actions,
  onCanvasClose,
  ...props
}: CanvasActionsProps) {
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
        'absolute inset-0 z-50 flex h-12 w-full items-center justify-between px-2 pr-4',
        className,
      )}
    >
      <TooltipButton tooltip='Close Canvas'>
        <Button
          variant='outline'
          size='sm'
          className='size-8'
          onClick={handleClose}
        >
          <XIcon className='h-4 w-4' />
        </Button>
      </TooltipButton>

      {actions && actions}
    </div>
  );
}
