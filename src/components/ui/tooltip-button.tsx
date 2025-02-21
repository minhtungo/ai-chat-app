import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipButtonProps
  extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  tooltip: string;
}

export function TooltipButton({
  children,
  tooltip,
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...props}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
