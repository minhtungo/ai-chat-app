import { appRoutes } from '@/config/routes';
import {
  getChatList,
  getChatListQueryOptions,
} from '@/features/chat/api/chat-list';
import {
  getPromptSuggestions,
  getPromptSuggestionsQueryOptions,
} from '@/features/chat/api/suggestions';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: ChatLayoutComponent,
  beforeLoad: async ({}) => {
    console.log('beforeLoad _app/index');
    throw redirect({ to: appRoutes.app.chat.path });
  },
  loader: ({ context }) => {
    context.queryClient.ensureInfiniteQueryData({
      queryKey: getChatListQueryOptions().queryKey,
      initialPageParam: 0,
      queryFn: ({ pageParam }) => getChatList({ offset: pageParam }),
    });

    context.queryClient.ensureQueryData({
      queryKey: getPromptSuggestionsQueryOptions().queryKey,
      queryFn: getPromptSuggestions,
    });
  },
});

function ChatLayoutComponent() {
  return <Outlet />;
}
