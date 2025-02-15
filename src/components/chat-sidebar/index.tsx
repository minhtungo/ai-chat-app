import { CreateNewChatLink } from '@/components/create-new-chat-link';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { appConfig } from '@/config/app';
import { ChatSearchModal } from '@/components/chat-sidebar/chat-search-modal';
import { NavChats } from '@/components/chat-sidebar/nav-chats';

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

export function ChatSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='offcanvas'
      className='left-12 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1+48px)]'
      {...props}
    >
      <SidebarHeader className='flex flex-row items-center justify-between'>
        <span>{appConfig.appName}</span>
        <div className='flex'>
          <ChatSearchModal />
          <CreateNewChatLink />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavChats chats={data.chats} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
