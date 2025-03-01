import { Camera, Square } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useWebcamRecorder } from '@/features/chat/hooks/use-webcam-recorder';
import { useChat, useChatCanvasActions } from '@/store/chat-store';
import { cn } from '@/utils/cn';
import { useParams } from '@tanstack/react-router';

interface WebcamRecorderProps {
  onVideoSegmentCapture?: (videoBlob: Blob) => void;
}

export function WebcamRecorder({ onVideoSegmentCapture }: WebcamRecorderProps) {
  const { id: chatId } = useParams({ from: '/_app/chat/$id' }) || { id: '123' };

  const { canvasMode } = useChat();
  const { setCanvasMode } = useChatCanvasActions();
  const isWebcamActive = canvasMode.isOpen && canvasMode.type === 'webcam';

  const { isRecording, startRecording, stopRecording, videoPreviewRef } =
    useWebcamRecorder({
      chatId,
      onVideoSegmentCapture,
    });

  const handleStartWebcam = async () => {
    setCanvasMode({
      isOpen: true,
      type: 'webcam',
      attachment: null,
      metadata: {
        isRecording: false,
        duration: 0,
        videoRef: videoPreviewRef as React.RefObject<HTMLVideoElement>,
      },
    });

    // Start recording
    await startRecording();
  };

  const handleStopWebcam = () => {
    stopRecording();
  };

  return (
    <Button
      onClick={isWebcamActive ? handleStopWebcam : handleStartWebcam}
      variant='ghost'
      type='button'
      size='icon'
      className={cn(
        'size-8 rounded-full',
        isRecording &&
          'text-destructive hover:text-destructive/90 hover:bg-destructive/10',
      )}
      title={isRecording ? 'Stop recording' : 'Start camera'}
    >
      {isRecording ? (
        <Square className='size-4.5' />
      ) : (
        <Camera className='size-4.5' />
      )}
    </Button>
  );
}
