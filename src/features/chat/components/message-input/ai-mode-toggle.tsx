import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useChatStoreActions,
  useChatStoreMode,
} from '@/features/chat/store/chat-store';
import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';

type AiModeToggleProps = {
  className?: string;
};

export function AiModeToggle({ className }: AiModeToggleProps) {
  const mode = useChatStoreMode();
  const { setMode } = useChatStoreActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn(
            'duration-100 [&>svg]:transition-transform data-[state=open]:[&>svg]:rotate-180',
            className,
          )}
        >
          {mode === 'quick-mode' ? 'Quick Mode' : 'Guide Mode'}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setMode('quick-mode')}>
          Live Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode('guide-mode')}>
          Guide Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
