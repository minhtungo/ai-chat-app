import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/api-paths';
import { api } from '@/lib/api-client';
import { useSession } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function logout() {
  return api.post(apiPaths.auth.logout.path);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { clearSession } = useSession();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      clearSession();
    },
  });
}
