import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipButtonProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
> & {
  tooltip: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export function TooltipButton({
  children,
  tooltip,
  className,
  side = 'bottom',
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger className={cn(className)} {...props} asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
