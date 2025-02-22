import { useUser } from '@/api/user/get-user';
import { PromptSuggestions } from '@/features/chat/components/prompt-suggestions';

export function NewChatScreen({}: React.ComponentProps<'div'>) {
  const { data: user } = useUser();

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-y-6 p-4'>
      <div className='space-y-3 text-center'>
        <h1 className='text-2xl font-semibold'>Hi, {user?.name || 'Guest'}</h1>
        <p className='text-muted-foreground text-lg'>
          I am your personal tutor, ask me anything!
        </p>
      </div>
      <PromptSuggestions />
    </div>
  );
}
