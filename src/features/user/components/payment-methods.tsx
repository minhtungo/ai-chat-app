import { Plus } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PaymentMethods({ ...props }: React.ComponentProps<'div'>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-primary text-lg'>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and billing information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground w-fit rounded-md border px-4 py-2 text-sm'>
          No payment methods added.
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <Plus /> Add Payment Method
        </Button>
      </CardFooter>
    </Card>
  );
}
