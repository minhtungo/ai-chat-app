import { Button } from '@/components/ui/button';
import { appRoutes } from '@/config/routes';
import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold'>Not Found</h2>
      <p className='text-muted-foreground mt-2 text-lg'>
        The page you are looking for does not exist.
      </p>
      <Button size='lg' className='mt-6' asChild>
        <Link to={appRoutes.home.path}>Go Home</Link>
      </Button>
    </div>
  );
}
