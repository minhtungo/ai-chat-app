import { AccountSidebar } from '@/components/account-sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account')({
  component: AccountLayoutComponent,
});

function AccountLayoutComponent() {
  return (
    <>
      <AccountSidebar />
      <main className='relative flex h-svh w-full flex-col'>
        <div className='flex-1 overflow-auto p-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
