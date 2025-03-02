import { Spinner } from '@/components/ui/spinner';

export function AppLoadingScreen() {
  return (
    <div className='flex min-h-svh items-center justify-center'>
      <Spinner size='xl' />
    </div>
  );
}
