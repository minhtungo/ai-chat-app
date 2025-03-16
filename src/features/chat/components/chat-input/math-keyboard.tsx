import { Button } from '@/components/ui/button';
import { TooltipButton } from '@/components/ui/tooltip-button';
import '@/styles/math-live.css';
import { Radical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type MathKeyboardProps = {
  onInsert: (expression: string) => void;
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
};

export function MathKeyboard({
  onInsert,
  onToggle,
  isOpen,
}: MathKeyboardProps) {
  const mathfieldRef = useRef<HTMLDivElement>(null);
  const mathfieldElementRef = useRef<any>(null);
  const [mathExpression, setMathExpression] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    import('mathlive').then(({ MathfieldElement }) => {
      if (!customElements.get('math-field')) {
        customElements.define('math-field', MathfieldElement);
      }

      if (!mathfieldElementRef.current && mathfieldRef.current) {
        const mathfield = new MathfieldElement();

        mathfield.classList.add('w-full');

        mathfield.mathVirtualKeyboardPolicy = 'manual';

        mathfield.addEventListener('input', () => {
          setMathExpression(mathfield.value);
        });

        // Handle Enter key to insert
        mathfield.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleInsert();
          }
        });

        mathfieldRef.current.appendChild(mathfield);
        mathfieldElementRef.current = mathfield;

        // Focus the mathfield and show the keyboard immediately
        setTimeout(() => {
          mathfield.focus();

          // Configure and show the keyboard
          if (window.mathVirtualKeyboard) {
            // Set keyboard container to our div
            window.mathVirtualKeyboard.container =
              document.getElementById('math-keyboard');

            window.mathVirtualKeyboard.layouts = [
              'numeric',
              'symbols',
              'greek',
            ];

            // Setup auto-height adjustment
            window.mathVirtualKeyboard.addEventListener(
              'geometrychange',
              () => {
                const keyboardDiv = document.getElementById('math-keyboard');
                if (keyboardDiv && window.mathVirtualKeyboard.boundingRect) {
                  keyboardDiv.style.height =
                    window.mathVirtualKeyboard.boundingRect.height + 'px';
                }
              },
            );

            window.mathVirtualKeyboard.show();
          }
        }, 100);
      }
    });

    return () => {
      // Hide keyboard on unmount
      if (window.mathVirtualKeyboard) {
        window.mathVirtualKeyboard.hide();
        window.mathVirtualKeyboard.container = null;
      }
    };
  }, [isOpen]);

  const handleInsert = () => {
    if (!mathExpression.trim()) return;

    // Format with appropriate delimiters
    const delimiter = '$';
    onInsert(`${delimiter}${mathExpression}${delimiter}`);

    // Clear and close
    if (mathfieldElementRef.current) {
      mathfieldElementRef.current.value = '';
    }
    setMathExpression('');
    onToggle(false);
  };

  if (!isOpen) {
    return (
      <TooltipButton tooltip='Math Input' sideOffset={0}>
        <Button
          variant='ghost'
          size='icon'
          type='button'
          className='size-8'
          onClick={() => onToggle(true)}
        >
          <Radical className='size-4.5' />
        </Button>
      </TooltipButton>
    );
  }

  return (
    <div className='w-full'>
      {/* Simple header with controls */}
      <div className='flex items-center justify-end'>
        <div className='flex gap-2'>
          <Button
            size='sm'
            onClick={handleInsert}
            disabled={!mathExpression.trim()}
          >
            Insert
          </Button>
          <Button size='sm' variant='outline' onClick={() => onToggle(false)}>
            Close
          </Button>
        </div>
      </div>

      <div className='p-2'>
        <div ref={mathfieldRef} className='mb-2 w-full' />
      </div>

      <div id='math-keyboard' className='w-full' style={{ height: '260px' }} />
    </div>
  );
}
