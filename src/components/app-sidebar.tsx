import { Search, SquarePen } from 'lucide-react';
import * as React from 'react';

import { NavChats } from '@/components/nav-chats';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { appConfig } from '@/config/app-config';
import ChatSearchModal from '@/features/chat/components/chat-search-modal';

const data = {
  user: {
    name: 'Tu',
    email: 'm@example.com',
    avatar: '',
  },
  chats: [
    {
      name: 'Design Engineering',
      id: 1,
    },
    {
      name: 'Sales & Marketing',
      id: 2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <span>{appConfig.appName}</span>
        <div className='flex'>
          <ChatSearchModal />
          <Button variant='ghost' size='icon'>
            <SquarePen className='size-4.5' />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavChats chats={data.chats} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
