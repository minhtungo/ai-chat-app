import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';

type SettingFormItemProps = React.ComponentProps<typeof FormItem> & {
  label: string;
};

export function SettingFormItem({
  label,
  className,
  children,
  ...props
}: SettingFormItemProps) {
  return (
    <FormItem className={`border-border border-t py-4 ${className}`} {...props}>
      <div className='flex flex-col justify-between gap-y-2.5 lg:flex-row lg:items-center'>
        <FormLabel>{label}</FormLabel>
        <FormControl>{children}</FormControl>
      </div>
      <FormMessage className='lg:ml-auto' />
    </FormItem>
  );
}
