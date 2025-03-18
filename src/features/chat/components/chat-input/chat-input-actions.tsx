import { Camera, Image, Plus, Radical } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VoiceRecorder } from '@/features/chat/components/chat-input/voice-recorder';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { useCanvasActions } from '@/store/canvas-store';
import { useRef } from 'react';

type ChatInputActionsProps = React.ComponentProps<'div'> & {};

export function ChatInputActions({}: ChatInputActionsProps) {
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
        <Button variant='outline' size='icon' className='rounded-full'>
          <Plus className='size-4.5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
          <Image className='size-4.5' /> Upload File
          <input
            type='file'
            ref={fileInputRef}
            onChange={addAttachment}
            multiple
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
