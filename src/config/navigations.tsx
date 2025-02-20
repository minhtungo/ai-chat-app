import { CreditCard, File, MessageSquare, Settings, User } from '@/components/icons';

export const appNavigations = {
  sidebar: [
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
  userDropdown: [
    {
      name: 'Profile',
      to: '/profile',
      icon: User,
    },
    {
      name: 'Billing',
      to: '/billing',
      icon: CreditCard,
    },
    {
      name: 'Settings',
      to: '/settings',
      icon: Settings,
    },
  ],
};
