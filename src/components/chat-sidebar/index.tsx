import { ChatList } from '@/components/chat-sidebar/chat-list';
import { ChatSearchModal } from '@/components/chat-sidebar/chat-search-modal';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CreateNewChatLink } from '@/features/chat/components/create-new-chat-link';

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
        <SidebarTrigger />
        <div className='flex'>
          <ChatSearchModal />
          <CreateNewChatLink />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ChatList />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
