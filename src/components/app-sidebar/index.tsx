import { UserMenu } from '@/components/app-sidebar/user-menu';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { appNavigations } from '@/config/navigations';
import { cn } from '@/utils/cn';
import { Link } from '@tanstack/react-router';

export function AppSideBar({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'text-sidebar-foreground border-border bg-sidebar relative z-50 hidden h-svh min-w-12 border-r py-2 md:block',
        className,
      )}
      {...props}
    >
      <div className='flex h-full w-full flex-col items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          {appNavigations.sidebar.map((item) => (
            <Tooltip key={`app-side-nav-${item.name}`}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
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
        <UserMenu />
      </div>
    </div>
  );
}
