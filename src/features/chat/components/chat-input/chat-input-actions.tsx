import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { VoiceRecorder } from '@/features/chat/components/chat-input/voice-recorder';
import { WebcamRecorder } from '@/features/chat/components/webcam-recorder';
import { Image } from 'lucide-react';
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
            accept='image/*,.pdf,.doc,.docx,video/*'
            hidden
          />
        </div>
      </TooltipButton>
      <TooltipButton tooltip='Voice Input' sideOffset={0}>
        <VoiceRecorder onRecordingComplete={() => {}} />
      </TooltipButton>
      <TooltipButton tooltip='Camera' sideOffset={0}>
        <WebcamRecorder />
      </TooltipButton>
    </div>
  );
}
