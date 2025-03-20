import FormResponse from '@/components/form/FormResponse';
import { buttonVariants } from '@/components/ui/button';
import { appRoutes } from '@/config/routes';
import { verifyEmail } from '@/features/auth/api/verify-email';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/verify-email/$token')({
  head: () => ({
    meta: [
      {
        title: `Verify Email`,
      },
    ],
  }),
  component: RouteComponent,
  loader: async ({ params }) => {
    const { token } = params;
    if (!token) {
      throw new Error('Token is required');
    }
    const response = await verifyEmail(token);
    console.log(response);
    return response;
  },
  errorComponent: ({ error }) => {
    return <div>{JSON.stringify(error.message)}</div>;
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return (
    <div className='space-y-6'>
      {data.success ? (
        <FormResponse
          title='Success'
          variant='success'
          description='Your email has been verified.'
        />
      ) : (
        <FormResponse
          title='Error'
          variant='destructive'
          description='Your email has not been verified.'
        />
      )}
      <Link
        to={appRoutes.auth.signIn.path}
        className={buttonVariants({ variant: 'default' })}
      >
        Sign In
      </Link>
    </div>
  );
}
