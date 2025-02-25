import { Mic, Square } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { formatSecondsToMMSS } from '@/utils/format';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number>(0);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Cleanup function to stop recording and clear intervals when component unmounts
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds += 1;
        setDuration(seconds);
      }, 1000);
    } catch (err) {
      toast.error(
        'Error accessing microphone. Please check your browser permissions.',
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      setDuration(0);
    }
  };

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
          <Mic className='size-4.5' />
        )}
      </Button>
    </div>
  );
}
