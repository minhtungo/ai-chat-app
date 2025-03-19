import { buttonVariants } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { appConfig } from '@/config/app-config';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function AppSidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-1 flex-col gap-y-4', className)} {...props}>
      <div className='flex flex-col gap-2.5'>
        {appConfig.menu.chatSidebar.map((item) => (
          <TooltipButton tooltip={item.name} key={`app-side-nav-${item.name}`}>
            <Link
              to={item.path}
              className='group flex flex-col items-center text-[13px]'
              activeProps={{
                className: '[&>div]:bg-accent',
              }}
            >
              <div
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  }),
                  'group-hover:bg-accent',
                )}
              >
                <item.icon className='size-5 shrink-0' aria-hidden='true' />
              </div>
              <span>{item.name}</span>
            </Link>
          </TooltipButton>
        ))}
      </div>
    </div>
  );
}
