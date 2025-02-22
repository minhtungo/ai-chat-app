import { useUser } from '@/api/user/get-user';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export function NewChat({}: React.ComponentProps<'div'>) {
  const { data: user } = useUser();
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-y-6 p-4'>
      <div className='space-y-3 text-center'>
        <h1 className='text-2xl font-semibold'>Hi, {user?.name}</h1>
        <p className='text-muted-foreground text-lg'>
          I am your personal tutor, ask me anything!
        </p>
      </div>
      <div className='grid gap-4 break-words md:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Button
            key={`new-chat-${index}`}
            variant='ghost'
            className='flex h-auto flex-row items-start gap-x-2 p-4 text-left whitespace-normal'
          >
            <Clock className='size-5' />
            <div className='space-y-4'>
              <div className='text-sm font-medium'>
                Language Charm Learning Mentor
              </div>
              <div className='text-muted-foreground text-xs'>
                Specializes in teaching the charm of language and witty
                responses
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
