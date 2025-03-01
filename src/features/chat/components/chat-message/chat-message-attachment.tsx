import { FileText } from '@/components/icons';
import { useCanvasActions } from '@/store/canvas-store';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatMessageAttachmentProps = React.ComponentProps<'button'> & {
  attachment: Attachment;
};

export function ChatMessageAttachment({
  attachment,
  className,
  ...props
}: ChatMessageAttachmentProps) {
  const { setCanvasMode } = useCanvasActions();

  return (
    <button
      type='button'
      className={cn(
        'relative mb-1 w-fit cursor-pointer rounded-md',
        attachment.type === 'document' &&
          'bg-secondary/40 z-10 flex max-w-[300px] items-center gap-1 p-2 pr-6',
        className,
      )}
      {...props}
      onClick={() =>
        setCanvasMode({
          isOpen: true,
          type: 'image',
          attachment,
        })
      }
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
    </button>
  );
}
