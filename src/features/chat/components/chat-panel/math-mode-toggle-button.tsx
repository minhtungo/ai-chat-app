import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useMessageInputStoreActions } from '@/features/chat/store/message-input-store';
import { Radical } from 'lucide-react';

export function MathModeToggleButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { toggleMathKeyboard } = useMessageInputStoreActions();

  return (
    <TooltipButton tooltip='Math Mode'>
      <Button
        variant='outline'
        size='sm'
        className='bg-transparent'
        {...props}
        onClick={toggleMathKeyboard}
      >
        <Radical className='size-4' />
      </Button>
    </TooltipButton>
  );
}
