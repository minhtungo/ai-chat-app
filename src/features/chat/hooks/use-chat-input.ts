import type { Attachment } from '@/types/chat';
import { convertFileToAttachment } from '@/utils/chat';
import { useState } from 'react';

export function useChatInput(
  onSend: (message: string, files: Attachment[]) => void,
) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage('');
      setAttachments([]);
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

  return {
    message,
    setMessage,
    attachments,
    setAttachments,
    handleSubmit,
    handleFileChange,
  };
}
