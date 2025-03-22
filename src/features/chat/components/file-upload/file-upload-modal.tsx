import { Paperclip } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { InputFileUpload } from '@/features/chat/components/file-upload/input-file-upload';
import { useMessageInputStoreActions } from '@/features/chat/store/message-input-store';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

type FileUploadModalProps = {};

export function FileUploadModal({}: FileUploadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const { addAttachment } = useMessageInputStoreActions();

  const handleUpload = () => {
    if (file) {
      addAttachment(file);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipButton tooltip='Upload File'>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm' className='bg-transparent'>
            <Paperclip className='size-4' />
          </Button>
        </DialogTrigger>
      </TooltipButton>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader className='mb-4'>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className='grid space-y-4'>
          <InputFileUpload onFileChange={setFile} />
        </div>
        <DialogFooter className='mt-6 sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Close
            </Button>
          </DialogClose>
          <Button disabled={!file} type='button' onClick={handleUpload}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
