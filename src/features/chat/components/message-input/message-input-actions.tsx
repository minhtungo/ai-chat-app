import { MathModeToggleButton } from '@/features/chat/components/chat-panel/math-mode-toggle-button';
import { FileUploadModal } from '@/features/chat/components/file-upload/file-upload-modal';
import { MessageSubmitButton } from '@/features/chat/components/message-input/message-submit-button';
import { cn } from '@/utils/cn';

type MessageInputActionsProps = React.ComponentProps<'div'> & {
  className?: string;
};

export function MessageInputActions({
  className,
  ...props
}: MessageInputActionsProps) {
  return (
    <div className={cn('flex items-center gap-x-2', className)} {...props}>
      <MathModeToggleButton />
      <FileUploadModal />
      <MessageSubmitButton />
    </div>
  );
}

// const fileInputRef = useRef<HTMLInputElement>(null);
// const { setCanvasMode } = useCanvasActions();
// const addAttachment = useMessageInputStore(
//   (state) => state.actions.addAttachment,
// );
// const toggleMathKeyboard = useMessageInputStore(
//   (state) => state.actions.toggleMathKeyboard,
// );

// const handleWebcamMode = () => {
//   setCanvasMode({
//     isOpen: true,
//     type: 'webcam',
//     attachment: null,
//   });
// };

// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button
//       variant='outline'
//       size='sm'
//       className='border-foreground/20 rounded-full bg-transparent'
//     >
//       <Plus className='size-4' />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align='start'>
//     <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
//       <Image className='size-4.5' /> Upload File
//       <input
//         type='file'
//         ref={fileInputRef}
//         onChange={addAttachment}
//         accept='image/*,.pdf,.doc,.docx,video/*'
//         hidden
//       />
//     </DropdownMenuItem>
//     <DropdownMenuItem onClick={toggleMathKeyboard}>
//       <Radical className='size-4.5' /> Math Input
//     </DropdownMenuItem>
//     <DropdownMenuItem asChild>
//       <VoiceRecorder onRecordingComplete={() => {}} />
//     </DropdownMenuItem>
//     <DropdownMenuItem onClick={handleWebcamMode}>
//       <Camera className='size-4.5' /> Camera
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
