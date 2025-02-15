import { File, MessageSquare } from 'lucide-react';

export const navigations = {
  appSidebar: [
    {
      name: 'Chat',
      to: '/chat',
      icon: MessageSquare,
    },
    {
      name: 'Files',
      to: '/files',
      icon: File,
    },
  ],
};
