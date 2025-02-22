import { ChatList } from '@/components/chat-sidebar/chat-list';
import { ChatSearchModal } from '@/components/chat-sidebar/chat-search-modal';
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
    name: 'Design Engineering Design Engineering',
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
      className='left-[56px] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1+56px)]'
      {...props}
    >
      <SidebarHeader className='flex-row items-center justify-between'>
        <span>{appConfig.appName}</span>
        <div className='flex'>
          <ChatSearchModal />
          <CreateNewChatLink />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ChatList chats={chats} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
