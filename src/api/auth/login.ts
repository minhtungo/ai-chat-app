import { getUserQueryOptions } from '@/api/user/get-user';
import { apiPaths } from '@/config/api-paths';
import { LogInInput } from '@/features/auth/validations/log-in';
import { baseApi } from '@/lib/api-client';
import { useAuth, useSession } from '@/store/auth';
import { AuthResponse } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export function loginWithEmailAndPassWord(data: LogInInput): Promise<AuthResponse> {
  return baseApi.post(apiPaths.auth.login.path, data);
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { setSession } = useSession();

  return useMutation({
    mutationFn: loginWithEmailAndPassWord,
    onSuccess: (data) => {
      // queryClient.setQueryData(getUserQueryOptions().queryKey, data.user);
      setSession({ user: data.user, token: data.accessToken });
      // queryClient.invalidateQueries({
      //   queryKey: getUserQueryOptions().queryKey,
      // });
      queryClient.setQueryData(getUserQueryOptions().queryKey, data.user);
      // router.navigate({
      //   to: '/chat',
      // });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
