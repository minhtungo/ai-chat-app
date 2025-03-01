import { Camera, Square, X } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { WebcamPreview } from '@/features/chat/components/webcam-recorder/webcam-preview';
import { useWebcamRecorder } from '@/features/chat/hooks/use-webcam-recorder';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface WebcamRecorderProps {
  onVideoSegmentCapture?: (videoBlob: Blob) => void;
}

export function WebcamRecorder({ onVideoSegmentCapture }: WebcamRecorderProps) {
  const chatId = '123'; // You should get this from your app context or URL params
  const [showPreview, setShowPreview] = useState(false);

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

  const handleStartRecording = async () => {
    setShowPreview(true);
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleClosePreview = () => {
    if (isRecording) {
      stopRecording();
    }
    setShowPreview(false);
  };

  return (
    <div className='relative inline-flex items-center'>
      {showPreview && (
        <div className='absolute -top-[220px] left-1/2 w-[300px] -translate-x-1/2 overflow-hidden rounded-md shadow-lg'>
          <WebcamPreview
            ref={videoPreviewRef}
            isRecording={isRecording}
            duration={duration}
            className='h-[200px]'
          />
          <div className='bg-accent flex items-center justify-between p-2'>
            <Button
              onClick={handleClosePreview}
              variant='ghost'
              size='icon'
              className='size-8 rounded-full'
            >
              <X className='size-4' />
            </Button>

            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              variant='ghost'
              size='icon'
              className={cn(
                'size-8 rounded-full',
                isRecording &&
                  'text-destructive hover:text-destructive/90 hover:bg-destructive/10',
              )}
            >
              {isRecording ? (
                <Square className='size-4.5' />
              ) : (
                <Camera className='size-4.5' />
              )}
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setShowPreview(!showPreview)}
        variant='ghost'
        type='button'
        size='icon'
        className='size-8 rounded-full'
        title='Camera'
      >
        <Camera className='size-4.5' />
      </Button>
    </div>
  );
}
