import { apiRoutes } from '@/config/routes';
import { api } from '@/lib/api-client';
import { type QueryConfig } from '@/lib/react-query';
import { type User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function getUser(): Promise<User> {
  return api.get(apiRoutes.user.me.path);
}

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
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
