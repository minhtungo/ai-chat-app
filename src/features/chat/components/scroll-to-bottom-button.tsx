import { ChevronDown } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

type ScrollToBottomButtonProps = React.ComponentProps<'button'> & {
  onClick: () => void;
  className?: string;
};

export function ScrollToBottomButton({
  onClick,
  className,
  ...props
}: ScrollToBottomButtonProps) {
  return (
    <Button
      variant='outline'
      size='sm'
      className={cn('transition-opacity0 rounded-full shadow-md', className)}
      onClick={onClick}
      {...props}
    >
      <ChevronDown className='size-3.5' />
    </Button>
  );
}
