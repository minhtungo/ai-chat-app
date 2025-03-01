import { useVideoUpload } from '@/features/chat/api/upload-video';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseWebcamRecorderOptions {
  chatId: string;
  segmentDuration?: number;
  onVideoSegmentCapture?: (videoBlob: Blob) => void;
}

interface UseWebcamRecorderReturn {
  isRecording: boolean;
  duration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  videoPreviewRef: React.RefObject<HTMLVideoElement | null>;
}

export function useWebcamRecorder({
  chatId,
  segmentDuration = 5000,
  onVideoSegmentCapture,
}: UseWebcamRecorderOptions): UseWebcamRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number>(0);
  const segmentIntervalRef = useRef<number>(0);
  const chunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const { mutate: uploadVideo } = useVideoUpload();

  // Clean up only on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      clearInterval(timerRef.current);
      clearInterval(segmentIntervalRef.current);
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoStreamRef.current = stream;

      // Display preview if video element exists
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      // Try to use the specified codecs, but fall back if not supported
      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      // Create a MediaRecorder with webm mime type
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Set up timer for duration display
      let seconds = 0;
      timerRef.current = window.setInterval(() => {
        seconds += 1;
        setDuration(seconds);
      }, 1000);

      // Set up interval to capture and upload segments
      segmentIntervalRef.current = window.setInterval(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === 'recording'
        ) {
          // Stop the current recording to get the data
          mediaRecorderRef.current.stop();

          // Create a new recorder to continue recording
          const newRecorder = new MediaRecorder(stream, { mimeType });

          // When the previous recorder stops, process its data
          mediaRecorderRef.current.onstop = () => {
            const videoBlob = new Blob(chunksRef.current, {
              type: 'video/webm',
            });

            // Generate a unique segment ID
            const segmentId = crypto.randomUUID();

            // Upload the video segment
            uploadVideo({
              videoBlob,
              chatId,
              segmentId,
            });

            if (onVideoSegmentCapture) {
              onVideoSegmentCapture(videoBlob);
            }

            chunksRef.current = [];

            // Start the new recorder
            newRecorder.ondataavailable = (e) => {
              if (e.data.size > 0) {
                chunksRef.current.push(e.data);
              }
            };
            mediaRecorderRef.current = newRecorder;
            newRecorder.start();
          };
        }
      }, segmentDuration);
    } catch (err) {
      toast.error(
        'Error accessing camera. Please check your browser permissions.',
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      // Process any remaining data
      mediaRecorderRef.current.onstop = () => {
        if (chunksRef.current.length > 0) {
          const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });

          // Generate a unique segment ID for the final segment
          const segmentId = crypto.randomUUID();

          // Upload the final video segment
          uploadVideo({
            videoBlob,
            chatId,
            segmentId,
          });

          // Also call the callback if provided
          if (onVideoSegmentCapture) {
            onVideoSegmentCapture(videoBlob);
          }

          chunksRef.current = [];
        }
      };

      // Stop all tracks
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Reset state
      setIsRecording(false);
      clearInterval(timerRef.current);
      clearInterval(segmentIntervalRef.current);
      setDuration(0);

      // Clear preview
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = null;
      }
    }
  };

  return {
    isRecording,
    duration,
    startRecording,
    stopRecording,
    videoPreviewRef,
  };
}
