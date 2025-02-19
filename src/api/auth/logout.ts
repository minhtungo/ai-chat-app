import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/api-paths';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/store/auth';

export function logout() {
  return api.post(apiPaths.auth.logout.path);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { clearSession } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      clearSession();
    },
  });
}
