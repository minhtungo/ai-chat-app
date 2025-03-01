import { Camera, Square } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useWebcamRecorder } from '@/features/chat/hooks/use-webcam-recorder';
import { cn } from '@/utils/cn';
import { formatSecondsToMMSS } from '@/utils/format';
import { useParams } from '@tanstack/react-router';

interface WebcamRecorderProps {
  onVideoSegmentCapture?: (videoBlob: Blob) => void;
}

export function WebcamRecorder({ onVideoSegmentCapture }: WebcamRecorderProps) {
  const { id: chatId } = useParams({ from: '/_app/chat/$id' });

  const {
    isRecording,
    duration,
    startRecording,
    stopRecording,
    videoPreviewRef,
  } = useWebcamRecorder({
    chatId,
    onVideoSegmentCapture,
  });

  return (
    <div className='relative inline-flex items-center'>
      {isRecording && (
        <div className='bg-accent text-popover-foreground absolute -top-16 left-1/2 min-w-[100px] -translate-x-1/2 rounded-md px-3 py-2 shadow-lg'>
          <div className='mb-1 text-sm'>Recording...</div>
          <div className='flex items-center gap-2'>
            <div className='bg-destructive h-2 w-2 animate-pulse rounded-full' />
            <span className='text-xs'>{formatSecondsToMMSS(duration)}</span>
          </div>
        </div>
      )}

      <Button
        onClick={isRecording ? stopRecording : startRecording}
        variant='ghost'
        type='button'
        size='icon'
        className={cn(
          'size-8 rounded-full',
          isRecording &&
            'text-destructive hover:text-destructive/90 hover:bg-destructive/10',
        )}
        title={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <Square className='size-4.5' />
        ) : (
          <Camera className='size-4.5' />
        )}
      </Button>

      {/* Hidden video preview element */}
      <video ref={videoPreviewRef} className='hidden' muted />
    </div>
  );
}
