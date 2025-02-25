import { apiRoutes } from '@/config/routes';
import type { ChangePasswordInput } from '@/features/user/hooks/use-change-password';
import { privateApi } from '@/lib/api-client';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

type ChangePasswordRequestDto = Omit<ChangePasswordInput, 'confirmNewPassword'>;

const dtoToChangePasswordRequest = (
  data: ChangePasswordInput,
): ChangePasswordRequestDto => {
  return {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  };
};

export function changePassword(data: ChangePasswordInput): Promise<User> {
  const requestDto = dtoToChangePasswordRequest(data);
  return privateApi.put(apiRoutes.user.profile.path, requestDto);
}

export function useChangePassword(onSuccess?: () => void) {
  return useMutation({
    mutationFn: changePassword,
    onSuccess,
  });
}
