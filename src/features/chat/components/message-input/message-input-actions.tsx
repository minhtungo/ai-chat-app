import { Camera, Image, Plus, Radical } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCanvasActions } from '@/features/canvas/store/canvas-store';
import { VoiceRecorder } from '@/features/chat/components/message-input/voice-recorder';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useRef } from 'react';

type MessageInputActionsProps = React.ComponentProps<'div'> & {};

export function MessageInputActions({}: MessageInputActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCanvasMode } = useCanvasActions();
  const addAttachment = useMessageInputStore(
    (state) => state.actions.addAttachment,
  );
  const toggleMathKeyboard = useMessageInputStore(
    (state) => state.actions.toggleMathKeyboard,
  );

  const handleWebcamMode = () => {
    setCanvasMode({
      isOpen: true,
      type: 'webcam',
      attachment: null,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='border-foreground/20 rounded-full bg-transparent'
        >
          <Plus className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
          <Image className='size-4.5' /> Upload File
          <input
            type='file'
            ref={fileInputRef}
            onChange={addAttachment}
            accept='image/*,.pdf,.doc,.docx,video/*'
            hidden
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleMathKeyboard}>
          <Radical className='size-4.5' /> Math Input
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <VoiceRecorder onRecordingComplete={() => {}} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWebcamMode}>
          <Camera className='size-4.5' /> Camera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
