import { privateApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import { type User } from '@/types/user';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function getUser(): Promise<User> {
  return privateApi.get(apiRoutes.user.me.path);
}

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: getUser,
  });
}

export function useUser() {
  return useQuery({
    ...getUserQueryOptions(),
  });
}
