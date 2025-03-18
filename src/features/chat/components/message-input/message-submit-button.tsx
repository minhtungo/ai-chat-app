import { Button } from '@/components/ui/button';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useChatStoreIsStreaming } from '@/store/chat-store';
import { ArrowUp, Square } from 'lucide-react';

type MessageSubmitButtonProps = React.ComponentProps<'button'>;

export function MessageSubmitButton({ ...props }: MessageSubmitButtonProps) {
  const isStreaming = useChatStoreIsStreaming();

  const currentMessage = useMessageInputStore((state) => state.state.message);

  const mathExpressions = useMessageInputStore(
    (state) => state.state.mathExpressions,
  );

  const attachments = useMessageInputStore((state) => state.state.attachments);

  return (
    <Button
      type='submit'
      className='size-8 rounded-full'
      size='icon'
      disabled={
        !currentMessage.trim() &&
        mathExpressions.length === 0 &&
        attachments.length === 0
      }
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
