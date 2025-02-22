import type { PromptSuggestion } from '@/types/api/chat';
import { queryOptions, useQuery } from '@tanstack/react-query';

// export function getPromptSuggestions(): Promise<PromptSuggestion[]> {
//   return api.get(apiRoutes.chat.suggestions.path);
// }

export async function getPromptSuggestions(): Promise<PromptSuggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      name: 'PromptSuggestion 1',
      description: 'PromptSuggestion Description 1',
    },
    {
      name: 'PromptSuggestion 2',
      description: 'PromptSuggestion Description 2',
    },
    {
      name: 'PromptSuggestion 3',
      description: 'PromptSuggestion Description 3',
    },
    {
      name: 'PromptSuggestion 4',
      description: 'PromptSuggestion Description 4',
    },
  ];
}

export function getPromptSuggestionsQueryOptions() {
  return queryOptions({
    queryKey: ['promptSuggestions'],
    queryFn: getPromptSuggestions,
  });
}

export function usePromptSuggestions() {
  return useQuery({
    ...getPromptSuggestionsQueryOptions(),
  });
}
