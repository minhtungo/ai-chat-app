import { PricingCard } from '@/components/common/pricing-card';
import { pricingPlans } from '@/lib/constants';

export function PricingSection() {
  return (
    <section className='container py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto mb-24 max-w-3xl text-center'>
          <h2 className='text-primary mb-1 text-base leading-relaxed'>
            Simple, transparent pricing
          </h2>
          <p className='scroll-m-20 text-2xl font-medium tracking-tight sm:text-3xl'>
            Choose the perfect plan for your team. All plans include a 14-day
            free trial.
          </p>
        </div>

        <div className='mx-auto grid max-w-4xl items-center gap-6 md:grid-cols-2'>
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              className='h-fit'
            />
          ))}
        </div>
      </div>
    </section>
  );
}
