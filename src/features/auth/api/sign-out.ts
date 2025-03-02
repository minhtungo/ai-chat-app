import { privateApi } from '@/api/api-client';
import { apiRoutes, appRoutes } from '@/config/routes';
import { getUserQueryOptions } from '@/features/user/api/get-user';
import { useSession } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useRouter } from '@tanstack/react-router';

export function signOut() {
  return privateApi.post(apiRoutes.auth.signOut.path);
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const { clearSession } = useSession();
  const router = useRouter();
  const location = useLocation();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(getUserQueryOptions().queryKey, undefined);
      clearSession();
      router.navigate({
        to: appRoutes.auth.signIn.path,
        search: {
          redirect: location.href,
        },
      });
    },
  });
}
