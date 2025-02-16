import { apiPaths } from '@/config/apiPaths';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';

export async function getUser(): Promise<User> {
  const response = await api.get(apiPaths.user.me.path);
  return response.data.user;
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

export function useUser({ queryConfig }: UseUserOptions = {}) {
  return useQuery({
    ...getUserQueryOptions(),
    ...queryConfig,
  });
}
