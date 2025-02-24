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
        <h2 className='text-xl font-semibold'>Profile</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
          <FormField
            control={form.control}
            name='theme'
            render={({ field }) => (
              <SettingFormItem label='Theme'>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={(value) => {
                    setTheme(value);
                    field.onChange(value);
                  }}
                  className='flex flex-wrap gap-2'
                >
                  {themes.map((theme) => (
                    <FormItem key={theme.value} className='block w-fit'>
                      <FormControl>
                        <RadioGroupItem
                          value={theme.value}
                          noIndicator
                          className='data-[state=checked]:border-primary aspect-auto size-auto w-fit cursor-pointer overflow-hidden rounded-md border'
                        >
                          <img
                            src={theme.image}
                            alt={`${theme.label} Theme`}
                            className='h-full w-full max-w-[100px] rounded-md object-cover'
                          />
                        </RadioGroupItem>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </SettingFormItem>
            )}
          />
          <div className='flex w-full justify-end'>
            <LoaderButton isPending={isPending}>Update</LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
