import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export async function uploadVideoSegment({
  videoBlob,
  chatId,
  segmentId,
  userId,
}: {
  videoBlob: Blob;
  chatId: string;
  segmentId: string;
  userId: string;
}): Promise<{ success: boolean; url?: string }> {
  try {
    const response = await axios.post(
      `http://localhost:3005/streaming/upload`,
      videoBlob,
      {
        headers: {
          'Content-Type': 'video/webm',
          userId: userId,
          examId: chatId,
          segmentId: segmentId,
          filename: `segment-${segmentId}.webm`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading video segment:', error);
    throw error;
  }
}

// React Query hook for video uploads
export function useVideoUpload() {
  const user = {
    id: 'user-123',
  };

  return useMutation({
    mutationFn: ({
      videoBlob,
      chatId,
      segmentId,
    }: {
      videoBlob: Blob;
      chatId: string;
      segmentId: string;
    }) => uploadVideoSegment({ videoBlob, chatId, segmentId, userId: user.id }),
    onSuccess: () => {
      // Silent success - no toast notification
      toast.success('Video segment uploaded successfully');
    },
    onError: () => {
      // Only show error toast
      toast.error('Failed to upload video segment. Please try again.');
    },
  });
}
