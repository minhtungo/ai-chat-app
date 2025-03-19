import {
  getChatList,
  getChatListQueryOptions,
} from '@/features/chat/api/chat-list';
import {
  getPromptSuggestions,
  getPromptSuggestionsQueryOptions,
} from '@/features/chat/api/suggestions';
import '@/styles/github-dark.css';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import 'katex/dist/katex.min.css';

export const Route = createFileRoute('/_app/chat')({
  component: ChatLayoutComponent,
  loader: ({ context }) => {
    console.log('beforeLoad _app/chat');
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
