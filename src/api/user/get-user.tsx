import { apiPaths } from '@/config/api-paths';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { useSession } from '@/store/auth';
import { User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export function getUser(): Promise<User> {
  return api.get(apiPaths.user.me.path);
}

export const userQueryKey = 'user';

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: [userQueryKey],
    queryFn: getUser,
  });
}

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export function useUserQuery({ queryConfig }: UseUserOptions = {}) {
  return useQuery({
    ...getUserQueryOptions(),
    retry: 1,
    ...queryConfig,
  });
}

export function useUser() {
  const userQuery = useUserQuery();
  // const router = useRouter();
  // const { setUser } = useSession();

  // useEffect(() => {
  //   if (userQuery.data) {
  //     setUser(userQuery.data);
  //   }
  // }, [userQuery.data, setUser]);

  return userQuery;
}
