import { ArrowUp, Camera, Image, Mic } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { ChatAttachments } from '@/features/chat/components/chat-attachments';
import { useChatInput } from '@/features/chat/hooks/use-chat-input';
import type { Attachment } from '@/types/chat';
import { useRef } from 'react';

type ChatInputProps = React.ComponentProps<'div'> & {
  onSend: (message: string, files: Attachment[]) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
  const {
    message,
    setMessage,
    attachments,
    handleSubmit,
    handleFileChange,
    handleRemoveAttachment,
  } = useChatInput(onSend);

  return (
    <form
      onSubmit={handleSubmit}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      <ChatAttachments
        attachments={attachments}
        onRemoveAttachment={handleRemoveAttachment}
      />
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder='Type a message...'
        className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
        autoFocus
      />
      <div className='flex items-center justify-between'>
        <ChatInputActions onFileChange={handleFileChange} />
        <div>
          <Button
            type='submit'
            className='size-8 rounded-full'
            size='icon'
            disabled={!message.trim() && attachments.length === 0}
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </form>
  );
}

type ChatInputActionsProps = React.ComponentProps<'div'> & {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ChatInputActions({ onFileChange }: ChatInputActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex gap-x-1'>
      <TooltipButton tooltip='Upload File' sideOffset={0}>
        <>
          <Button
            variant='ghost'
            size='icon'
            type='button'
            className='size-8'
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className='size-4.5' />
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={onFileChange}
            className='hidden'
            multiple
            accept='image/*,.pdf,.doc,.docx'
          />
        </>
      </TooltipButton>
      <TooltipButton tooltip='Voice Input' sideOffset={0}>
        <Button variant='ghost' size='icon' className='size-8' type='button'>
          <Mic className='size-4.5' />
        </Button>
      </TooltipButton>
      <TooltipButton tooltip='Camera' sideOffset={0}>
        <Button variant='ghost' size='icon' className='size-8' type='button'>
          <Camera className='size-4.5' />
        </Button>
      </TooltipButton>
    </div>
  );
}
