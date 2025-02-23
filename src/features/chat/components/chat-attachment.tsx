import { FileText, XIcon } from '@/components/icons';
import { TooltipButton } from '@/components/ui/tooltip-button';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';

type ChatAttachmentProps = React.ComponentProps<'div'> & {
  attachment: Attachment;
  onRemoveAttachment: (id: string) => void;
};

export function ChatAttachment({
  attachment,
  className,
  onRemoveAttachment,
  ...props
}: ChatAttachmentProps) {
  return (
    <div
      key={`chat-input-attachment-${attachment.id}`}
      className={cn(
        'relative mb-1 max-w-[250px] rounded-md',
        attachment.type === 'doc' &&
          'bg-secondary/40 z-10 flex items-center gap-1 p-2 pr-6',
        className,
      )}
      {...props}
    >
      <TooltipButton tooltip='Remove'>
        <button
          onClick={() => onRemoveAttachment(attachment.id)}
          className='text-muted-foreground hover:text-foreground bg-secondary/40 absolute top-0 -right-0 cursor-pointer rounded-full p-[2px]'
        >
          <XIcon className='size-3' />
        </button>
      </TooltipButton>
      {attachment.type === 'image' ? (
        <img
          src={attachment.url}
          className='aspect-square size-14 rounded-md'
        />
      ) : (
        <div className='flex items-center gap-x-2 overflow-hidden'>
          <div className='bg-accent size-10 rounded-md p-2'>
            <FileText className='size-6' />
          </div>
          <span className='truncate text-sm'>{attachment.name}</span>
        </div>
      )}
    </div>
  );
}
