import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { LoaderButton } from '@/components/ui/loader-button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/features/user/api/get-user';
import { useUpdatePreferences } from '@/features/user/api/update-preferences';
import { SettingFormItem } from '@/features/user/components/setting-form-item';
import { useUpdatePreferencesForm } from '@/features/user/hooks/use-update-preferences-form';
import { themes } from '@/lib/constants';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { z } from 'zod';

export function UpdatePreferencesForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useUpdatePreferencesForm();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();
  const { data: user } = useUser();
  const { setTheme } = useTheme();

  if (!user) return null;

  const onSubmit = (data: z.infer<typeof schema>) => {
    updatePreferences(data);
  };

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <div className='py-4'>
        <h2 className='text-xl font-semibold'>Preferences</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
          <FormField
            control={form.control}
            name='theme'
            render={({ field }) => (
              <SettingFormItem
                label='Theme'
                controlClassName='lg:w-full lg:max-w-none lg:justify-end'
              >
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    setTheme(value);
                    field.onChange(value);
                  }}
                  className='flex flex-wrap gap-2'
                >
                  {themes.map((theme) => (
                    <FormItem key={theme.value}>
                      <FormControl>
                        <RadioGroupItem
                          value={theme.value}
                          noIndicator
                          className='group flex aspect-auto size-auto w-fit cursor-pointer flex-col gap-1 overflow-hidden rounded-md border-none shadow-none'
                        >
                          <img
                            src={theme.image}
                            alt={`${theme.label} Theme`}
                            className='group-data-[state=checked]:border-primary h-full w-full max-w-[100px] rounded-md border object-cover'
                          />
                          <div className='text-muted-foreground group-data-[state=checked]:text-foreground flex items-center justify-center gap-1 text-sm'>
                            <theme.icon className='size-4' />
                            {theme.label}
                          </div>
                        </RadioGroupItem>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </SettingFormItem>
            )}
          />
          <div className='mt-3 flex w-full justify-end'>
            <LoaderButton isPending={isPending}>Update</LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
