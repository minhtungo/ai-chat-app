import { apiRoutes } from '@/config/routes';
import type { UpdateProfileInput } from '@/features/user/hooks/use-update-profile-form';
import { api } from '@/lib/api-client';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

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
  return api.put(apiRoutes.user.profile.path, requestDto);
}

export function useUpdateProfile(onSuccess?: () => void) {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess,
  });
}
