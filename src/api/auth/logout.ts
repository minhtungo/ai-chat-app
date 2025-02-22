import { getUserQueryOptions } from '@/api/user/get-user';
import { apiRoutes, appRoutes } from '@/config/routes';
import { api } from '@/lib/api-client';
import { useSession } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useRouter } from '@tanstack/react-router';

export function logout() {
  return api.post(apiRoutes.auth.logout.path);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { clearSession } = useSession();
  const router = useRouter();
  const location = useLocation();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      clearSession();
      router.navigate({
        to: appRoutes.auth.login.path,
        search: {
          redirect: location.href,
        },
      });
    },
  });
}
