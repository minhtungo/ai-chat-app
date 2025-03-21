import { FileText, XIcon } from '@/components/icons';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import type { Attachment } from '@/features/chat/types';
import { cn } from '@/utils/cn';

type MessageInputAttachmentProps = React.ComponentProps<'div'> & {
  attachment: Attachment;
};
export function MessageInputAttachments() {
  const attachments = useMessageInputStore((state) => state.state.attachments);

  if (attachments.length === 0) return null;

  return (
    <div className='mb-1 flex gap-2 overflow-auto pt-1'>
      {attachments.map((attachment) => (
        <div key={`chat-input-attachment-${attachment.id}`}>
          <MessageInputAttachment attachment={attachment} />
        </div>
      ))}
    </div>
  );
}

function MessageInputAttachment({
  attachment,
  className,
  ...props
}: MessageInputAttachmentProps) {
  const removeAttachment = useMessageInputStore(
    (state) => state.actions.removeAttachment,
  );

  return (
    <div
      key={`message-input-attachment-${attachment.id}`}
      className={cn(
        'relative mb-1 w-fit rounded-md',
        attachment.type === 'document' &&
          'bg-secondary/40 z-10 flex max-w-[250px] items-center gap-1 p-2 pr-6',
        className,
      )}
      {...props}
    >
      <TooltipButton tooltip='Remove'>
        <button
          onClick={() => removeAttachment(attachment.id)}
          className='text-foreground bg-secondary/40 absolute top-0 -right-0 cursor-pointer rounded-full p-[2px]'
        >
          <XIcon className='size-3' />
        </button>
      </TooltipButton>
      {attachment.type === 'image' ? (
        <img
          src={attachment.url}
          className='aspect-square size-14 rounded-md object-cover'
        />
      ) : (
        <div className='flex items-center gap-x-2 overflow-hidden'>
          <div className='bg-accent flex items-center justify-center rounded-md p-2'>
            <FileText className='size-6' />
          </div>
          <span className='truncate text-sm'>{attachment.name}</span>
        </div>
      )}
    </div>
  );
}
