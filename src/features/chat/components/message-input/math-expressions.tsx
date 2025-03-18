import { Badge } from '@/components/ui/badge';
import { MathPreview } from '@/features/chat/components/message-input/math-preview';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { X } from 'lucide-react';

export function MathExpressions() {
  const mathExpressions = useMessageInputStore(
    (state) => state.state.mathExpressions,
  );

  const handleRemoveMath = useMessageInputStore(
    (state) => state.actions.removeMathExpression,
  );

  if (mathExpressions.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {mathExpressions.map((expr, index) => (
        <Badge key={`math-expr-${index}`} className='relative overflow-visible'>
          <MathPreview content={expr} />
          <button
            type='button'
            onClick={() => handleRemoveMath(index)}
            className='text-muted-foreground hover:text-foreground bg-accent absolute -top-2 -right-2 cursor-pointer rounded-full p-1'
          >
            <X className='size-3' />
          </button>
        </Badge>
      ))}
    </div>
  );
}
