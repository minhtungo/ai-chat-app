import { streamChatCompletion } from '@/features/chat/api/stream-chat-completion';
import {
  useAddMessage,
  useSetIsStreaming,
  useUpdateStreamingResponse,
} from '@/store/chat-store';
import type { Attachment } from '@/types/chat';
import { convertFileToAttachment } from '@/utils/chat';
import { useState } from 'react';

export function useMessages() {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const addMessage = useAddMessage();
  const updateStreamingResponse = useUpdateStreamingResponse();
  const setIsStreaming = useSetIsStreaming();

  const sendMessage = async (message: string, attachments: Attachment[]) => {
    if (!message.trim() && attachments.length === 0) {
      return;
    }

    setMessage('');
    setAttachments([]);

    addMessage({
      id: crypto.randomUUID(),
      content: message,
      role: 'user',
      createdAt: new Date(),
      attachments,
    });

    addMessage({
      id: crypto.randomUUID(),
      content: '',
      role: 'assistant',
      createdAt: new Date(),
      attachments: [],
    });

    setIsStreaming(true);

    let accumulatedResponse = '';

    try {
      await streamChatCompletion(
        message,
        (chunk) => {
          accumulatedResponse += chunk;
          updateStreamingResponse(accumulatedResponse);
        },
        () => {
          setIsStreaming(false);
        },
      );
    } catch (error) {
      console.error('Chat completion error:', error);
      updateStreamingResponse(
        'Sorry, there was an error processing your request.',
      );
      setIsStreaming(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) =>
        convertFileToAttachment(file),
      );
      setAttachments((current) => [...current, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((currentAttachments) =>
      currentAttachments.filter((attachment) => attachment.id !== id),
    );
  };

  return {
    message,
    setMessage,
    attachments,
    setAttachments,
    handleFileChange,
    handleRemoveAttachment,
    sendMessage,
  };
}
