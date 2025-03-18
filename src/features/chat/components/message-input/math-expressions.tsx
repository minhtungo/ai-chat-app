import { MathPreview } from '@/features/chat/components/message-input/math-preview';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import { X } from 'lucide-react';

export function MathExpressions({ ...props }: React.ComponentProps<'div'>) {
  const mathExpressions = useMessageInputStore(
    (state) => state.state.mathExpressions,
  );

  const handleRemoveMath = useMessageInputStore(
    (state) => state.actions.removeMathExpression,
  );

  return (
    <div {...props}>
      {mathExpressions.length > 0 && (
        <div className='mt-2 mb-1 space-y-1'>
          {mathExpressions.map((expr, index) => (
            <div
              key={`math-expr-${index}`}
              className='bg-muted relative rounded p-1 pr-8'
            >
              <MathPreview content={expr} />
              <button
                type='button'
                onClick={() => handleRemoveMath(index)}
                className='text-muted-foreground hover:text-foreground absolute top-1 right-1 rounded-full p-1'
              >
                <X className='size-4' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
