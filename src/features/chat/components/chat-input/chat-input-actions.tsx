import { Camera, Image, Mic, Plus, Radical } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCanvasActions } from '@/store/canvas-store';
import { useRef } from 'react';

type ChatInputActionsProps = React.ComponentProps<'div'> & {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMathKeyboard: () => void;
};

export function ChatInputActions({
  onFileChange,
  onToggleMathKeyboard,
}: ChatInputActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setCanvasMode } = useCanvasActions();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='rounded-full'>
            <Plus className='size-4.5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Image className='size-4.5' /> Upload File
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleMathKeyboard}>
            <Radical className='size-4.5' /> Math Input
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <VoiceRecorder onRecordingComplete={() => {}} /> Voice Input
             */}
            <Mic className='size-4.5' /> Voice Input
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCanvasMode({
                isOpen: true,
                type: 'webcam',
                attachment: null,
              });
            }}
          >
            <Camera className='size-4.5' /> Camera
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type='file'
        ref={fileInputRef}
        onChange={onFileChange}
        multiple
        accept='image/*,.pdf,.doc,.docx,video/*'
        hidden
      />
    </>
  );
}
