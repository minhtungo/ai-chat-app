import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function ChatHistoryLoadingScreen({
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className='flex min-h-0 flex-1 flex-col overflow-auto' {...props}>
      <div className='mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col overflow-auto pt-5 pb-12'>
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 2 }).map((_, i) => (
            <React.Fragment key={`chat-history-skeleton-${i}`}>
              <Skeleton className='ml-auto h-12 w-64 rounded-md' />
              <Skeleton className='h-12 w-64 rounded-md' />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
