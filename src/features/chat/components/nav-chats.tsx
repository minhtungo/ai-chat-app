import { MoreHorizontal, Pencil, Share, Trash2, type LucideIcon } from 'lucide-react';

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
import { Link } from '@tanstack/react-router';

export function NavChats({
  chats,
}: {
  chats: {
    name: string;
    id: number;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
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
