import { cn } from '@/utils/cn';
import { useRef } from 'react';

function Textarea({
  className,
  onChange,
  ...props
}: React.ComponentProps<'textarea'>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      if (!textarea.value) {
        textarea.style.height = '';
        return;
      }
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      data-slot='textarea'
      ref={textareaRef}
      onChange={(e) => {
        adjustHeight();
        onChange?.(e);
      }}
      onInput={adjustHeight}
      className={cn(
        'border-input placeholder:text-muted-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/50 flex field-sizing-fixed min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
