import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useMessageInputStoreActions } from '@/features/chat/store/message-input-store';
import { Paperclip } from 'lucide-react';
import { useRef } from 'react';

export function FileUploadButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { addAttachment } = useMessageInputStoreActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <TooltipButton tooltip='Upload File'>
        <Button
          variant='outline'
          size='sm'
          className='bg-transparent'
          {...props}
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className='size-4' />
        </Button>
      </TooltipButton>
      <input
        type='file'
        ref={fileInputRef}
        onChange={(e) => addAttachment(e.target.files?.[0])}
        accept='image/*,.pdf,.doc,.docx,video/*'
        hidden
      />
    </>
  );
}
