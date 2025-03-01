import { cn } from '@/utils/cn';
import { formatSecondsToMMSS } from '@/utils/format';

type WebcamPreviewProps = React.ComponentProps<'video'> & {
  isRecording: boolean;
  duration: number;
};

export const WebcamPreview = ({
  isRecording,
  duration,
  className,
  ref,
}: WebcamPreviewProps) => {
  return (
    <div className={cn('relative overflow-hidden rounded-md', className)}>
      <video
        ref={ref}
        className='h-full w-full object-cover'
        autoPlay
        playsInline
        muted
      />

      {isRecording && (
        <div className='absolute top-2 right-2 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-red-500' />
          <span>{formatSecondsToMMSS(duration)}</span>
        </div>
      )}
    </div>
  );
};

WebcamPreview.displayName = 'WebcamPreview';
