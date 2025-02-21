import { ChatSearchModal } from '@/components/chat-sidebar/chat-search-modal';
import { NavChats } from '@/components/chat-sidebar/nav-chats';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { appConfig } from '@/config/app';
import { CreateNewChatLink } from '@/features/chat/components/create-new-chat-link';

const chats = [
  {
    name: 'Design Engineering',
    id: 1,
  },
  {
    name: 'Sales & Marketing',
    id: 2,
  },
];

export function ChatSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
        <NavChats chats={chats} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
