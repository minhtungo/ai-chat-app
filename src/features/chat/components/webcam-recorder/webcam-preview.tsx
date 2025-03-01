import { Camera, Square } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { useWebcamRecorder } from '@/features/chat/hooks/use-webcam-recorder';
import { cn } from '@/utils/cn';
import { formatSecondsToMMSS } from '@/utils/format';
import { useParams } from '@tanstack/react-router';

type WebcamPreviewProps = React.ComponentProps<'div'> & {};

export const WebcamPreview = ({ className, ...props }: WebcamPreviewProps) => {
  const { id: chatId } = useParams({ from: '/_app/chat/$id' }) || { id: '123' };
  const {
    isRecording,
    startRecording,
    stopRecording,
    videoPreviewRef,
    duration,
  } = useWebcamRecorder({
    chatId,
  });

  return (
    <div
      className={cn('relative overflow-hidden rounded-md', className)}
      {...props}
    >
      <video
        ref={videoPreviewRef}
        className='h-full w-full object-cover'
        autoPlay
        playsInline
        muted
      />

      {isRecording && (
        <div className='text-foreground absolute top-2 right-4 flex items-center gap-2 rounded-md px-2 py-1 text-xs'>
          <div className='size-2 animate-pulse rounded-full bg-red-500' />
          <span>{formatSecondsToMMSS(duration)}</span>
        </div>
      )}
      <div className='bg-background/80 absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 overflow-hidden rounded-md'>
        <TooltipButton
          tooltip={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <Button
            variant='outline'
            size='icon'
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              isRecording &&
                'text-destructive hover:text-destructive/90 hover:bg-destructive/10 bg-transparent',
            )}
          >
            {isRecording ? (
              <Square className='size-4.5 animate-pulse fill-red-500' />
            ) : (
              <Camera className='size-4.5' />
            )}
          </Button>
        </TooltipButton>
      </div>
    </div>
  );
};

WebcamPreview.displayName = 'WebcamPreview';
