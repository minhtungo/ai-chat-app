import { apiRoutes } from '@/config/routes';
import type { UpdateProfileInput } from '@/features/user/hooks/use-update-profile-form';
import { privateApi } from '@/lib/api-client';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdateProfileRequestDto = UpdateProfileInput;

const dtoToUpdateProfileRequest = (
  data: UpdateProfileInput,
): UpdateProfileRequestDto => {
  return {
    name: data.name,
    avatar: data.avatar,
  };
};

export function updateProfile(data: UpdateProfileInput): Promise<User> {
  const requestDto = dtoToUpdateProfileRequest(data);
  return privateApi.put(apiRoutes.user.profile.path, requestDto);
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Your profile has been updated.');
    },
    onError: () => {
      toast.error('Failed to update profile. Please try again.');
    },
  });
}
