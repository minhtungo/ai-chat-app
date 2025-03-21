import type { Attachment } from '@/features/chat/types';

export function convertFileToAttachment(file: File): Attachment {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type.startsWith('image/') ? 'image' : 'document',
    url: URL.createObjectURL(file),
    createdAt: new Date(),
  };
}
