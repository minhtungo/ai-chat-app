import { FileText } from '@/components/icons';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatMessageAttachmentProps = React.ComponentProps<'div'> & {
  attachment: Attachment;
};

export function ChatMessageAttachment({
  attachment,
  className,
  ...props
}: ChatMessageAttachmentProps) {
  return (
    <div
      key={`chat-input-attachment-${attachment.id}`}
      className={cn(
        'relative mb-1 w-fit rounded-md',
        attachment.type === 'doc' &&
          'bg-secondary/40 z-10 flex max-w-[300px] items-center gap-1 p-2 pr-6',
        className,
      )}
      {...props}
    >
      {attachment.type === 'image' ? (
        <img
          src={attachment.url}
          className='aspect-auto h-full w-full max-w-[300px] rounded-md object-cover'
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
