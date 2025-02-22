import { ArrowUp, Camera, Image, Mic, Paperclip } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TooltipButton } from '@/components/ui/tooltip-button';
import type { Attachment } from '@/types/chat';
import { convertFileToAttachment } from '@/utils/chat';
import { useRef, useState } from 'react';

type ChatInputProps = React.ComponentProps<'div'> & {
  onSend: (message: string, files: Attachment[]) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      const attachments = files.map((file) => convertFileToAttachment(file));
      onSend?.(message, attachments);
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((current) => [...current, ...newFiles]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      {files.length > 0 && (
        <div className='mt-1 mb-1 flex flex-wrap gap-2'>
          {files.map((file, index) => (
            <div
              key={index}
              className='bg-secondary/80 flex items-center gap-1 rounded-md p-2'
            >
              {file.type.startsWith('image/') ? (
                <div className='flex items-center gap-x-2'>
                  <img
                    src={URL.createObjectURL(file)}
                    className='size-10 rounded-md object-cover'
                  />
                  <span className='text-sm'>{file.name}</span>
                </div>
              ) : (
                <div className='flex items-center gap-x-2'>
                  <Paperclip className='size-10 rounded-md' />
                  <span className='text-sm'>{file.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
                onChange={handleFileChange}
                className='hidden'
                multiple
                accept='image/*,.pdf,.doc,.docx'
              />
            </>
          </TooltipButton>
          <TooltipButton tooltip='Voice Input' sideOffset={0}>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              type='button'
            >
              <Mic className='size-4.5' />
            </Button>
          </TooltipButton>
          <TooltipButton tooltip='Camera' sideOffset={0}>
            <Button
              variant='ghost'
              size='icon'
              className='size-8'
              type='button'
            >
              <Camera className='size-4.5' />
            </Button>
          </TooltipButton>
        </div>
        <div>
          <Button
            type='submit'
            className='size-8 rounded-full'
            size='icon'
            disabled={!message.trim() && files.length === 0}
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </form>
  );
}
