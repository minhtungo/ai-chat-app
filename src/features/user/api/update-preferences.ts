import { apiRoutes } from '@/config/routes';
import type { UpdatePreferencesInput } from '@/features/user/hooks/use-update-preferences-form';
import { privateApi } from '@/lib/api-client';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdatePreferencesRequestDto = {
  theme: string;
};

const dtoToUpdatePreferencesRequest = (
  data: UpdatePreferencesInput,
): UpdatePreferencesRequestDto => {
  return {
    theme: data.theme,
  };
};

export function updatePreferences(data: UpdatePreferencesInput): Promise<User> {
  const requestDto = dtoToUpdatePreferencesRequest(data);
  return privateApi.put(apiRoutes.user.preferences.path, requestDto);
}

export function useUpdatePreferences() {
  return useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => {
      toast.success('Your preferences have been updated.');
    },
    onError: () => {
      toast.error('Failed to update preferences. Please try again.');
    },
  });
}
