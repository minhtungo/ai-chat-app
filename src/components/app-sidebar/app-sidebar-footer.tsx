import { UserMenu } from '@/components/app-sidebar/user-menu';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/utils/cn';

export function AppSidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { state } = useSidebar();
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className,
      )}
      {...props}
    >
      <SidebarTrigger
        className={cn(
          'scale-0 opacity-0 transition-opacity duration-200 ease-in-out',
          state === 'collapsed' && 'scale-100 opacity-100',
        )}
      />
      <UserMenu />
    </div>
  );
}
