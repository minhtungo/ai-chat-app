import { apiPaths } from '@/config/api-paths';
import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';

type GetUserResponse = {
  user: User;
};

export function getUser(): Promise<GetUserResponse> {
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
