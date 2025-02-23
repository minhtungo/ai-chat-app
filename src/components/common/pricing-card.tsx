import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

type PricingCardProps = React.ComponentProps<typeof Card> & {
  title: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
};

export function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  className,
  ...props
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative w-full',
        isPopular && 'border-primary/40 shadow-lg',
        className,
      )}
      {...props}
    >
      {isPopular && (
        <div className='absolute -top-3 right-0 left-0 flex justify-center'>
          <span className='bg-accent rounded-full px-3 py-0.5 text-sm'>
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className='mb-3 text-base font-normal'>{title}</CardTitle>
        <div className='flex items-baseline gap-1'>
          <span className='text-3xl'>${price}</span>
          <span className='text-muted-foreground text-sm'>per month</span>
        </div>
        <p className='text-muted-foreground mt-4 text-sm'>{description}</p>
        <Separator className='mt-6' />
      </CardHeader>
      <CardContent className='grid gap-4'>
        {features.map((feature) => (
          <div
            key={`${feature}-pricing-plan`}
            className='flex items-center gap-2 text-sm'
          >
            <Check className='size-4 shrink-0' />
            <span>{feature}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className='w-full' variant={isPopular ? 'default' : 'outline'}>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
