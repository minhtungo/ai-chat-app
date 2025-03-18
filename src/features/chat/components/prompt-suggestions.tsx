import { Info } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePromptSuggestions } from '@/features/chat/api/suggestions';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { cn } from '@/utils/cn';

export function PromptSuggestions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { data: promptSuggestions } = usePromptSuggestions();

  const sendMessage = useMessageInputStore(
    (state) => state.actions.sendMessage,
  );

  return (
    <div
      className={cn('grid gap-3 break-words md:grid-cols-2', className)}
      {...props}
    >
      {promptSuggestions?.map((suggestion) => (
        <Button
          key={`new-chat-${suggestion.name}`}
          variant='outline'
          className='flex h-auto flex-row items-start gap-x-2 p-4 text-left whitespace-normal'
          onClick={() => {
            sendMessage();
          }}
        >
          <Info className='size-5' />
          <div className='space-y-4'>
            <div className='text-sm font-medium'>
              Language Charm Learning Mentor
            </div>
            <div className='text-muted-foreground text-xs'>
              Specializes in teaching the charm of language and witty responses
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
