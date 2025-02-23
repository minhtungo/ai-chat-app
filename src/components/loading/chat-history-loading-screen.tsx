import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function ChatHistoryLoadingScreen({
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className='mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-auto pt-5 pb-12'
      {...props}
    >
      <div className='flex flex-col gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <React.Fragment key={`chat-history-skeleton-${i}`}>
            <Skeleton className='ml-auto h-14 w-64 rounded-md' />
            <Skeleton className='h-14 w-64 rounded-md' />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
