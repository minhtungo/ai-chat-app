import { apiRoutes } from '@/config/routes';
import type { UpdatePreferencesInput } from '@/features/user/hooks/use-update-preferences-form';
import { api } from '@/lib/api-client';
import type { User } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

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
  return api.put(apiRoutes.user.preferences.path, requestDto);
}

export function useUpdatePreferences(onSuccess?: () => void) {
  return useMutation({
    mutationFn: updatePreferences,
    onSuccess,
  });
}
