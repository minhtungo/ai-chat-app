import { MoreHorizontal, Pencil, Share, Trash2 } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useChatList } from '@/features/chat/api/chat-list';
import { useChatActions } from '@/store/chat-store';
import { Link } from '@tanstack/react-router';

export function ChatList() {
  const { data } = useChatList();
  const { isMobile } = useSidebar();
  const { setChatName } = useChatActions();
  const chats = data?.pages.flatMap((page) => page.chats) ?? [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Today</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.name}>
            <SidebarMenuButton asChild>
              <Link
                to='/chat/$id'
                params={{
                  id: chat.id.toString(),
                }}
                activeProps={{
                  className: 'bg-accent',
                }}
                onClick={() => setChatName(chat.name)}
              >
                <span>{chat.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className='sr-only'>More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-48 rounded-lg'
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <Share className='text-muted-foreground' />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className='text-muted-foreground' />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className='text-muted-foreground' />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
