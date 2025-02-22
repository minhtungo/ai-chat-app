import { ArrowUp, Camera, Image, Mic } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { appConfig } from '@/config/app';
import { cn } from '@/utils/cn';

type ChatPanelProps = React.ComponentProps<'div'>;

export function ChatPanel({ className, ...props }: ChatPanelProps) {
  return (
    <div className={cn('group m-auto w-full', className)} {...props}>
      <div className='bg-background relative z-10 mx-auto flex flex-1 flex-col xl:max-w-5xl'>
        <form className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'>
          <Textarea
            placeholder='Type a message...'
            className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
            autoFocus
          />
          <div className='flex items-center justify-between'>
            <div className='flex gap-x-1'>
              <TooltipButton tooltip='Upload File' sideOffset={0}>
                <Button variant='ghost' size='icon' className='size-8'>
                  <Image className='size-4.5' />
                </Button>
              </TooltipButton>
              <TooltipButton tooltip='Voice Input' sideOffset={0}>
                <Button variant='ghost' size='icon' className='size-8'>
                  <Mic className='size-4.5' />
                </Button>
              </TooltipButton>
              <TooltipButton tooltip='Camera' sideOffset={0}>
                <Button variant='ghost' size='icon' className='size-8'>
                  <Camera className='size-4.5' />
                </Button>
              </TooltipButton>
            </div>
            <div>
              <Button className='size-8 rounded-full' size='icon'>
                <ArrowUp />
              </Button>
            </div>
          </div>
        </form>
        <p className='text-muted-foreground py-2 text-center text-xs'>
          {appConfig.appName} Tutor can make mistakes. Consider checking
          important information.
        </p>
      </div>
    </div>
  );
}
