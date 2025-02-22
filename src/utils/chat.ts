import type { Attachment } from '@/types/chat';

export function convertFileToAttachment(file: File): Attachment {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type.startsWith('image/') ? 'image' : 'doc',
    url: URL.createObjectURL(file),
    createdAt: new Date(),
  };
}
