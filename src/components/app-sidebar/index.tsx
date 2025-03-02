import { AppSidebarContent } from '@/components/app-sidebar/app-sidebar-content';
import { AppSidebarFooter } from '@/components/app-sidebar/app-sidebar-footer';
import { AppSidebarHeader } from '@/components/app-sidebar/app-sidebar-header';
import { cn } from '@/utils/cn';

export function AppSideBar({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'text-sidebar-foreground border-border bg-sidebar relative z-50 hidden h-svh min-w-14 border-r py-3 md:block',
        className,
      )}
      {...props}
    >
      <div className='flex h-full w-full flex-col items-center justify-between gap-y-4'>
        <AppSidebarHeader />
        <AppSidebarContent />
        <AppSidebarFooter />
      </div>
    </div>
  );
}
