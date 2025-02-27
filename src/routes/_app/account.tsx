import { AccountSidebar } from '@/components/account-sidebar';
import { appRoutes } from '@/config/routes';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: appRoutes.auth.signIn.path });
    }
  },
  component: AccountLayoutComponent,
});

function AccountLayoutComponent() {
  return (
    <>
      <AccountSidebar />
      <main className='relative h-svh flex-1 overflow-auto py-6'>
        <div className='mx-auto max-w-4xl space-y-10 px-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
}
