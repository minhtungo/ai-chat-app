import { Frame, Map, PieChart } from 'lucide-react';
import * as React from 'react';

import { NavChats } from '@/components/nav-chats';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { appConfig } from '@/lib/app-config';

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
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>{appConfig.appName}</SidebarHeader>
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
