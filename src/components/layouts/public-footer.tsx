import { publicNavigations } from '@/config/navigations';
import { appRoutes } from '@/config/routes';
import { Link } from '@tanstack/react-router';

export function PublicFooter({
  className,
  ...props
}: React.ComponentProps<'footer'>) {
  return (
    <footer className={className} {...props}>
      <div className='container space-y-6 pb-4'>
        <div className='border-border/40 flex flex-col flex-wrap items-center justify-between gap-4 border-t pt-6 sm:flex-row'>
          <div className='space-y-4 text-center sm:text-left'>
            <Link to={appRoutes.public.home.path}>
              <span className='text-foreground text-lg font-medium'>Lumi</span>
            </Link>
          </div>
        </div>
        <div className='flex w-full flex-col items-center justify-between gap-y-4 text-xs sm:flex-row'>
          <div className='text-muted-foreground sm:w-3/12'>
            © {new Date().getFullYear()} Lumi. All rights Reserved.
          </div>
          <ul className='flex flex-1 items-center justify-end gap-x-4'>
            {publicNavigations.footer.map(({ name, path }) => (
              <li
                key={`footer-${name}`}
                className='text-muted-foreground hover:text-primary'
              >
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
