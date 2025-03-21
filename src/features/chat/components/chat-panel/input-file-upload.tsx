import { useFileInput } from '@/hooks/use-file-input';
import { cn } from '@/utils/cn';
import { FileText, Upload, X } from 'lucide-react';
import { useState } from 'react';

export function InputFileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    fileName,
    fileInputRef,
    clearFile,
    error,
    validateAndSetFile,
    fileSize,
  } = useFileInput({ accept: 'image/*', maxSize: 5 });

  function handleFile(file: File) {
    validateAndSetFile(file);

    if (!error) {
      simulateUpload(file);
    }
  }

  function simulateUpload(file: File) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    }, 100);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    handleFile(droppedFile);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    handleFile(selectedFile);
  }

  function removeFile() {
    clearFile();
    setPreview(null);
    setUploadProgress(0);
  }

  return (
    <div className='w-full space-y-2'>
      <div
        className={cn(
          'group relative cursor-pointer',
          'rounded-lg border-2 border-dashed',
          'transition-colors duration-200',
          isDragging
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
            : 'border-zinc-200 dark:border-zinc-800',
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label='Upload file'
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleChange}
          className='hidden'
        />

        <div className='space-y-4 p-8'>
          {!fileName ? (
            <div className='flex flex-col items-center gap-2'>
              <Upload className='h-8 w-8 text-zinc-400 dark:text-zinc-500' />
              <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                Drag and drop or click to upload
              </p>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              {preview ? (
                <div className='relative h-16 w-16 overflow-hidden rounded-lg'>
                  <img
                    src={preview}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800'>
                  <FileText className='h-8 w-8 text-zinc-400' />
                </div>
              )}
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>
                  {fileName || 'No file selected'}
                </p>
                <p className='text-xs text-zinc-500'>
                  {fileSize
                    ? `${(fileSize / 1024 / 1024).toFixed(2)} MB`
                    : '0 MB'}
                </p>
                {uploadProgress < 100 && (
                  <div className='mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800'>
                    <div
                      className='h-full bg-indigo-500 transition-all duration-200'
                      style={{
                        width: `${uploadProgress}%`,
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className='rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              >
                <X className='h-5 w-5 text-zinc-400' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
