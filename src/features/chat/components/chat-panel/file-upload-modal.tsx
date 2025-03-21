import { Paperclip } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { InputFileUpload } from '@/features/chat/components/chat-panel/input-file-upload';

type FileUploadModalProps = {};

export function FileUploadModal({}: FileUploadModalProps) {
  return (
    <Dialog modal={false}>
      <TooltipButton tooltip='Upload File'>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm' className='bg-transparent'>
            <Paperclip className='size-4.5' />
          </Button>
        </DialogTrigger>
      </TooltipButton>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader className='mb-4'>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className=''>
          <InputFileUpload />
        </div>
      </DialogContent>
    </Dialog>
  );
}
