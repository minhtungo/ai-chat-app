import { Camera, Image } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { VoiceRecorder } from '@/features/chat/components/chat-input/voice-recorder';
import { useRef } from 'react';

type ChatInputActionsProps = React.ComponentProps<'div'> & {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ChatInputActions({ onFileChange }: ChatInputActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex gap-x-1'>
      <TooltipButton tooltip='Upload File' sideOffset={0}>
        <div>
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
            multiple
            accept='image/*,.pdf,.doc,.docx'
            hidden
          />
        </div>
      </TooltipButton>
      <TooltipButton tooltip='Voice Input' sideOffset={0}>
        {/* <Button variant='ghost' size='icon' className='size-8' type='button'>
          <Mic className='size-4.5' />
        </Button> */}
        <VoiceRecorder onRecordingComplete={() => {}} />
      </TooltipButton>
      <TooltipButton tooltip='Camera' sideOffset={0}>
        <Button variant='ghost' size='icon' className='size-8' type='button'>
          <Camera className='size-4.5' />
        </Button>
      </TooltipButton>
    </div>
  );
}
