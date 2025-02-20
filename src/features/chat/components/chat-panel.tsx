import { Textarea } from '@/components/ui/textarea';

interface ChatPanelProps extends React.ComponentProps<'div'> {}

export default function ChatPanel({}: ChatPanelProps) {
  return (
    <div className='p-4'>
      <Textarea />
    </div>
  );
}
