export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
  attachments: Attachment[];
};

export type Attachment = {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'document';
  createdAt: Date;
};

export type ChatMode = 'solve-mode' | 'guide-mode';
