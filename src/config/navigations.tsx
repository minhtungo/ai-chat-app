import { File, MessageSquare } from '@/components/icons';

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
