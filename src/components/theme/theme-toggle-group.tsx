import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/utils/cn';
import { LaptopMinimal, MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const THEME_OPTIONS = [
  {
    value: 'system',
    icon: <LaptopMinimal className='size-3.5' />,
  },
  {
    value: 'light',
    icon: <Sun className='size-3.5' />,
  },
  {
    value: 'dark',
    icon: <MoonStar className='size-3.5' />,
  },
];

export function ThemeToggleGroup({ className }: React.ComponentProps<'div'>) {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup
      value={theme}
      onValueChange={setTheme}
      type='single'
      className={cn('w-fit overflow-visible rounded-full border', className)}
    >
      {THEME_OPTIONS.map(({ value, icon }) => (
        <ToggleGroupItem
          key={`theme-switcher-${value}`}
          value={value}
          aria-label='system'
          size='sm'
          className='rounded-full'
        >
          {icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
