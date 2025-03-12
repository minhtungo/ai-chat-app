import { Copy, RefreshCcw, ThumbsDown, ThumbsUp } from '@/components/icons';

export const chatMessageActions = [
  {
    icon: Copy,
    tooltip: 'Copy',
  },
  {
    icon: RefreshCcw,
    tooltip: 'Redo',
  },
  {
    icon: ThumbsUp,
    tooltip: 'Like',
  },
  {
    icon: ThumbsDown,
    tooltip: 'Dislike',
  },
] as const;
