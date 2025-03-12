import { Button } from '@/components/ui/button';
import { useIsStreaming } from '@/store/chat-store';
import { ArrowUp, Square } from 'lucide-react';

type ChatSubmitButtonProps = React.ComponentProps<'button'>;

export function ChatSubmitButton({
  disabled,
  ...props
}: ChatSubmitButtonProps) {
  const isStreaming = useIsStreaming();

  return (
    <Button
      type='submit'
      className='size-8 rounded-full'
      size='icon'
      disabled={disabled}
      {...props}
    >
      {isStreaming ? (
        <Square className='size-4' />
      ) : (
        <ArrowUp className='size-4' />
      )}
    </Button>
  );
}
