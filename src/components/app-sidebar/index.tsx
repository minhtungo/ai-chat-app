import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { navigations } from '@/config/navigations';
import { NavUser } from '@/components/app-sidebar/nav-user';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

export function AppSideBar({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'text-sidebar-foreground hidden md:block relative z-50 h-svh min-w-12 border-r border-border bg-sidebar py-2',
        className
      )}
      {...props}
    >
      <div className='flex h-full w-full flex-col items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          {navigations.appSidebar.map((item) => (
            <Tooltip key={`app-side-nav-${item.name}`}>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <item.icon className='size-5 shrink-0' aria-hidden='true' />
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' align='center'>
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <NavUser />
      </div>
    </div>
  );
}
