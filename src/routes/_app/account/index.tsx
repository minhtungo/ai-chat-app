import { appRoutes } from '@/config/routes';
import { Navigate, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/')({
  head: () => ({
    meta: [
      {
        title: 'Account',
      },
    ],
  }),
  component: AccountIndexComponent,
  beforeLoad: async ({}) => {
    return redirect({ to: appRoutes.app.chat.path });
  },
});

function AccountIndexComponent() {
  return <Navigate to={appRoutes.account.profile.path} />;
}
