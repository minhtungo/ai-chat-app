import { privateApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { ChangePasswordInput } from '@/features/user/hooks/use-change-password';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

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

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Your password has been changed.');
    },
    onError: () => {
      toast.error('Failed to change password. Please try again.');
    },
  });
}
