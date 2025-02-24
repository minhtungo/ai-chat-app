import { AccountSidebar } from '@/components/account-sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account')({
  component: AccountLayoutComponent,
});

function AccountLayoutComponent() {
  return (
    <>
      <AccountSidebar />
      <main className='relative h-svh flex-1 overflow-auto py-6'>
        <div className='mx-auto max-w-4xl px-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
