import { privateApi } from '@/api/api-client';
import { apiRoutes, appRoutes } from '@/config/routes';
import { getUserQueryOptions } from '@/features/user/api/get-user';
import { handleError } from '@/lib/errors';
import { useSession } from '@/store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export function signOut() {
  return privateApi.get(apiRoutes.auth.signOut.path);
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
    onError: (error: AxiosError) => {
      const errorMessage = handleError(
        error,
        'Failed to sign out. Please try again.',
      );
      console.log('errorMessage', errorMessage);
      return errorMessage;
    },
  });
}
