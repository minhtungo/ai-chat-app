import { cn } from '@/utils/cn';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher({ className }: React.ComponentProps<'div'>) {
  const { theme, setTheme } = useTheme();

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      checked={theme === 'dark'}
      onCheckedChange={(checked: boolean) =>
        setTheme(checked ? 'dark' : 'light')
      }
    >
      <Moon className='text-background pointer-events-none absolute left-[1px] size-3.5 data-[state=unchecked]:hidden' />
      <SwitchPrimitives.Thumb className='bg-background pointer-events-none z-10 block h-4 w-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-[1.5px]' />
      <Sun className='text-foreground pointer-events-none absolute right-[1px] size-3.5 data-[state=checked]:hidden' />
    </SwitchPrimitives.Root>
  );
}
