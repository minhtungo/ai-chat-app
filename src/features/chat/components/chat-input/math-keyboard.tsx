import { Button } from '@/components/ui/button';
import { useMessageInputStore } from '@/features/chat/store/message-input-store';
import '@/styles/math-live.css';
import { MathfieldElement } from 'mathlive';
import { useEffect, useRef, useState } from 'react';

type MathKeyboardProps = {};

export default function MathKeyboard({}: MathKeyboardProps) {
  const mathfieldRef = useRef<HTMLDivElement>(null);
  const mathfieldElementRef = useRef<any>(null);
  const [mathExpression, setMathExpression] = useState('');

  const addMathExpression = useMessageInputStore(
    (state) => state.actions.addMathExpression,
  );

  const toggleMathKeyboard = useMessageInputStore(
    (state) => state.actions.toggleMathKeyboard,
  );

  useEffect(() => {
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

          window.mathVirtualKeyboard.layouts = ['numeric', 'symbols', 'greek'];

          // Setup auto-height adjustment
          window.mathVirtualKeyboard.addEventListener('geometrychange', () => {
            const keyboardDiv = document.getElementById('math-keyboard');
            if (keyboardDiv && window.mathVirtualKeyboard.boundingRect) {
              keyboardDiv.style.height =
                window.mathVirtualKeyboard.boundingRect.height + 'px';
            }
          });

          window.mathVirtualKeyboard.show();
        }
      }, 100);
    }

    return () => {
      if (window.mathVirtualKeyboard) {
        window.mathVirtualKeyboard.hide();
        window.mathVirtualKeyboard.container = null;
      }
    };
  }, []);

  const handleInsert = () => {
    if (!mathExpression.trim()) return;

    // Format with appropriate delimiters
    const delimiter = '$';
    addMathExpression(`${delimiter}${mathExpression}${delimiter}`);

    // Clear and close
    if (mathfieldElementRef.current) {
      mathfieldElementRef.current.value = '';
    }
    setMathExpression('');
    toggleMathKeyboard();
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-end'>
        <div className='flex gap-2'>
          <Button
            size='sm'
            onClick={handleInsert}
            disabled={!mathExpression.trim()}
          >
            Insert
          </Button>
          <Button size='sm' variant='outline' onClick={toggleMathKeyboard}>
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
