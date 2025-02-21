import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface LoaderButtonProps extends React.ComponentProps<'button'> {
  isPending: boolean;
}

export function LoaderButton({
  className,
  children,
  isPending,
  disabled,
  type = 'submit',
  ...props
}: LoaderButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || isPending}
      className={className}
      {...props}
    >
      {children}
      {isPending && <Spinner />}
    </Button>
  );
}
