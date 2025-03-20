import { PlanCard } from '@/features/user/components/plan-card';
import { pricingPlans } from '@/lib/constants';

export function Plans() {
  return (
    <section>
      <h2 className='text-primary mb-4 text-lg font-semibold'>All Plans</h2>

      <ul className='mx-auto grid gap-6 md:grid-cols-2'>
        {pricingPlans.map((plan) => (
          <li key={plan.title}>
            <PlanCard
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              className='h-full'
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
