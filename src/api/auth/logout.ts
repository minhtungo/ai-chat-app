import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/apiPaths';
import { appConfig } from '@/config/app';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function logout() {
  return api.post(apiPaths.auth.logout.path);
}

export function useLogoutMutation({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      sessionStorage.removeItem(appConfig.accessToken.name);
      onSuccess?.();
    },
  });
}
