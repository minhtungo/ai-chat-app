import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderButton } from '@/components/ui/loader-button';
import { useUser } from '@/features/user/api/get-user';
import { useUpdateProfile } from '@/features/user/api/update-profile';
import { SettingFormItem } from '@/features/user/components/setting-form-item';
import { useUpdateProfileForm } from '@/features/user/hooks/use-update-profile-form';
import { cn } from '@/utils/cn';
import { getNameInitials } from '@/utils/name';
import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import { z } from 'zod';

export function UpdateProfileForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const { form, schema } = useUpdateProfileForm();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data: user } = useUser();
  const [file, setFile] = useState<File>();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const onSubmit = (data: z.infer<typeof schema>) => {
    updateProfile(data);
  };

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <div className='py-4'>
        <h2 className='text-xl font-semibold'>Profile</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='py-4'>
          <SettingFormItem label='Avatar'>
            <>
              <input
                type='file'
                accept='image/*'
                name='avatar'
                ref={avatarInputRef}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                hidden
              />
              <Avatar
                className='size-14 border'
                onClick={() => {
                  avatarInputRef.current?.click();
                }}
              >
                <div className='bg-card/60 absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center overflow-hidden opacity-0 transition duration-300 ease-in-out hover:opacity-100'>
                  <Camera className='size-4' />
                </div>
                <AvatarImage
                  src={
                    (file && URL.createObjectURL(file)) ||
                    user?.avatar ||
                    undefined
                  }
                  alt={`${user?.name}-avatar`}
                />
                <AvatarFallback className='text-lg'>
                  {getNameInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </>
          </SettingFormItem>
          <div className='border-border flex flex-col justify-between gap-y-2.5 border-t py-4 lg:flex-row lg:items-center'>
            <Label>Email</Label>
            <Input
              className='lg:w-[30%] lg:max-w-[240px]'
              placeholder='Email'
              value={user.email!}
              disabled
            />
          </div>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <SettingFormItem label='Name'>
                <Input
                  className='lg:w-[30%] lg:max-w-[240px]'
                  autoComplete='name'
                  type='text'
                  autoFocus
                  {...field}
                />
              </SettingFormItem>
            )}
          />
          <div className='flex w-full justify-end'>
            <LoaderButton isPending={isPending}>Update </LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
