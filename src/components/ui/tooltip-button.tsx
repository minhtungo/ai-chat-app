import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type TooltipButtonProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  tooltip: string;
};

export function TooltipButton({
  children,
  tooltip,
  className,
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger className={cn(className)} asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent {...props}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
