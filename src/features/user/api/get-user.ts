import { privateApi } from '@/api/api-client';
import { apiRoutes } from '@/config/routes';
import type { ApiResponse } from '@/types/api';
import { type User } from '@/types/user';
import {
  type UseQueryResult,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';

export function getUser(): Promise<ApiResponse<User>> {
  return privateApi.get(apiRoutes.user.me.path);
}

export function getUserQueryOptions() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getUser();
      return response.data;
    },
  });
}

export function useUser(): UseQueryResult<User> {
  return useQuery({
    ...getUserQueryOptions(),
  });
}
