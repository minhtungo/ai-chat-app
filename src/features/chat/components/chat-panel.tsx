import { Camera, Image, Mic, Send } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TooltipButton } from '@/components/ui/tooltip-button';

interface ChatPanelProps extends React.ComponentProps<'div'> {}

export function ChatPanel({}: ChatPanelProps) {
  return (
    <div className='border-sidebar-border relative border-t'>
      <div className='flex flex-col gap-y-2 p-2'>
        <Textarea
          placeholder='Type a message...'
          className='ring-none max-h-[200px] min-h-20 resize-none border-none focus-visible:ring-0 focus-visible:outline-none'
          autoFocus
        />
        <div className='flex items-center justify-between'>
          <div className='flex gap-x-1'>
            <TooltipButton tooltip='Upload File' sideOffset={0}>
              <Button variant='ghost' size='icon'>
                <Image className='size-4.5' />
              </Button>
            </TooltipButton>
            <TooltipButton tooltip='Voice Input' sideOffset={0}>
              <Button variant='ghost' size='icon'>
                <Mic className='size-4.5' />
              </Button>
            </TooltipButton>
            <TooltipButton tooltip='Camera' sideOffset={0}>
              <Button variant='ghost' size='icon'>
                <Camera className='size-4.5' />
              </Button>
            </TooltipButton>
          </div>
          <div>
            <Button className='rounded-full p-2' size='icon'>
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
