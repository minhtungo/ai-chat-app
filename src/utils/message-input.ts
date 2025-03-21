export function adjustMessageInputHeight(textarea: HTMLTextAreaElement | null) {
  if (textarea) {
    if (!textarea.value) {
      textarea.style.height = '';
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
