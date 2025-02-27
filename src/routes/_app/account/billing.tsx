import { PaymentMethods } from '@/features/user/components/payment-methods';
import { Plans } from '@/features/user/components/plans';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/account/billing')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PaymentMethods />
      <Plans />
    </>
  );
}
