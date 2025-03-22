import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface UseFileInputOptions {
  accept?: string;
  maxSize?: number;
  onFileChange?: (file: File | undefined) => void;
}

export function useFileInput({
  accept,
  maxSize,
  onFileChange,
}: UseFileInputOptions) {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | undefined) => {
    setError('');

    if (file) {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        toast.error(`File size must be less than ${maxSize}MB`);
        return;
      }

      const acceptTypes = accept?.split(',').map((type) => type.trim()) || [];
      const isAccepted = acceptTypes.some((type) => {
        if (type.includes('/*')) {
          return file.type.startsWith(type.replace('/*', '/'));
        } else if (type.startsWith('.')) {
          return file.name.endsWith(type);
        }
        return false;
      });

      if (accept && !isAccepted) {
        setError(`File type must be ${accept}`);
        toast.error(`File type must be ${accept}`);
        return;
      }

      setFile(file);
      onFileChange?.(file);
    }
  };

  const clearFile = () => {
    setFile(undefined);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    file,
    error,
    fileInputRef,
    handleFileSelect,
    validateAndSetFile,
    clearFile,
  };
}
