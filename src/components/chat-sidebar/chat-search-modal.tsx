import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Search, XIcon } from '@/components/icons';

interface ChatSearchModalProps {}

export function ChatSearchModal({}: ChatSearchModalProps) {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Search className='size-4.5' />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='bg-muted p-0 sm:max-w-[680px]'
        hideDefaultCloseButton
      >
        <div className='flex-grow overflow-y-auto'>
          <div className='flex max-h-[440px] min-h-[440px] flex-col'>
            <div className='mr-4 ml-6 flex max-h-16 min-h-16 items-center justify-between'>
              <input
                className='focus:ring-none border-none bg-transparent focus:outline-none'
                placeholder='Search chats...'
              />
              <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <XIcon />
                <span className='sr-only'>Close</span>
              </DialogClose>
            </div>
            <Separator className='bg-primary/10' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
