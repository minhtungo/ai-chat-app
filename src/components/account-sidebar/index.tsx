import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { appConfig } from '@/config/app-config';
import { Link } from '@tanstack/react-router';

export function AccountSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='none' {...props}>
      <SidebarHeader className='p-4'>
        <h1 className='text-2xl font-bold'>Account</h1>
        <p className='text-muted-foreground text-sm'>
          Manage your account settings and preferences
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {appConfig.menu.accountSidebar.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.path}
                    className='h-10'
                    activeProps={{
                      className: 'bg-accent',
                    }}
                  >
                    <item.icon className='size-4' />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
