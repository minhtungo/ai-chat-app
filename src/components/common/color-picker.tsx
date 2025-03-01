import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TooltipButton } from '@/components/ui/tooltip-button';
import { cn } from '@/utils/cn';
import { Paintbrush } from 'lucide-react';

const solids = [
  '#ff3b30',
  '#ff9500',
  '#ffcc00',
  '#5ac8fa',
  '#8a2be2',
  '#39ff14',
  '#ff36ff',
  '#4d4dff',
];
type ColorPickerProps = {
  color: string;
  setColor: (color: string) => void;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export function ColorPicker({
  color,
  setColor,
  className,
  side = 'bottom',
}: ColorPickerProps) {
  return (
    <Popover>
      <TooltipButton tooltip='Pick a color'>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 cursor-pointer rounded-full border focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0',
              className,
            )}
          >
            {color ? (
              <div
                className='size-4 rounded-full'
                style={{ background: color }}
              ></div>
            ) : (
              <Paintbrush className='h-4 w-4' />
            )}
          </button>
        </PopoverTrigger>
      </TooltipButton>
      <PopoverContent side={side} className='w-fit p-2'>
        <div className='flex flex-wrap gap-1'>
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className='h-6 w-6 cursor-pointer rounded-md active:scale-105'
              onClick={() => setColor(s)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
