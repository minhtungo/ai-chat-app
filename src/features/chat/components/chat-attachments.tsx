import { Paperclip } from '@/components/icons';
import type { Attachment } from '@/types/chat';

type ChatAttachmentProps = React.ComponentProps<'div'> & {
  attachments: Attachment[];
};

export function ChatAttachments({ attachments }: ChatAttachmentProps) {
  if (attachments.length === 0) return null;
  return (
    <div className='mt-1 mb-1 flex flex-wrap gap-2'>
      {attachments.map((attachment) => (
        <div
          key={`${attachment.id}`}
          className='bg-secondary/80 flex items-center gap-1 rounded-md p-2'
        >
          {attachment.type === 'image' ? (
            <div className='flex items-center gap-x-2'>
              <img
                src={attachment.url}
                className='size-10 rounded-md object-cover'
              />
              <span className='text-sm'>{attachment.name}</span>
            </div>
          ) : (
            <div className='flex items-center gap-x-2'>
              <Paperclip className='size-10 rounded-md' />
              <span className='text-sm'>{attachment.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
