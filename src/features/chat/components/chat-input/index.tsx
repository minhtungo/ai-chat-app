import { X } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';
import { ChatInputActions } from '@/features/chat/components/chat-input/chat-input-actions';
import { ChatInputAttachment } from '@/features/chat/components/chat-input/chat-input-attachment';
import { ChatSubmitButton } from '@/features/chat/components/chat-input/chat-submit-button';
import { MathKeyboard } from '@/features/chat/components/chat-input/math-keyboard';
import { MathPreview } from '@/features/chat/components/chat-input/math-preview';
import { useMessage } from '@/features/chat/hooks/use-message';
import { useRef, useState } from 'react';

type ChatInputProps = {};

export function ChatInput({}: ChatInputProps) {
  const {
    currentMessage,
    setCurrentMessage,
    attachments,
    sendMessage,
    handleFileChange,
    handleRemoveAttachment,
  } = useMessage();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isMathKeyboardOpen, setIsMathKeyboardOpen] = useState(false);
  const [mathExpressions, setMathExpressions] = useState<string[]>([]);

  const handleInsertMath = (expression: string) => {
    setMathExpressions([...mathExpressions, expression]);
  };

  const handleRemoveMath = (index: number) => {
    setMathExpressions(mathExpressions.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    const combinedMessage = [currentMessage, ...mathExpressions]
      .filter((text) => text.trim())
      .join('\n\n');

    sendMessage(combinedMessage, attachments);
    setMathExpressions([]);
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className='border-input focus-within:border-ring/20 flex w-full flex-col justify-between gap-y-1 rounded-xl border px-3 py-2'
    >
      {attachments.length > 0 && (
        <div className='mb-1 flex gap-2 overflow-auto pt-1'>
          {attachments.map((attachment) => (
            <div key={`chat-input-attachment-${attachment.id}`}>
              <ChatInputAttachment
                attachment={attachment}
                onRemoveAttachment={handleRemoveAttachment}
              />
            </div>
          ))}
        </div>
      )}

      {isMathKeyboardOpen ? (
        <MathKeyboard
          onInsert={handleInsertMath}
          onToggle={setIsMathKeyboardOpen}
          isOpen={isMathKeyboardOpen}
        />
      ) : (
        <>
          <Textarea
            ref={textareaRef}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.style.height = '';
                handleSendMessage();
              }
            }}
            placeholder='Type a message...'
            className='max-h-[200px] min-h-16 w-full resize-none border-none p-0 focus-visible:ring-0 focus-visible:outline-none'
            autoFocus
          />

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

          <div className='flex items-center justify-between'>
            <ChatInputActions
              onFileChange={handleFileChange}
              onToggleMathKeyboard={() => setIsMathKeyboardOpen(true)}
            />
            <div>
              <ChatSubmitButton
                disabled={
                  !currentMessage.trim() &&
                  mathExpressions.length === 0 &&
                  attachments.length === 0
                }
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
