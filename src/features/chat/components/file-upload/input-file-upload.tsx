import { useFileInput } from '@/hooks/use-file-input';
import { cn } from '@/utils/cn';
import { FileText, Upload, X } from 'lucide-react';
import { useState } from 'react';

type InputFileUploadProps = {
  onFileChange: (file: File | undefined) => void;
};

export function InputFileUpload({ onFileChange }: InputFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { file, fileInputRef, clearFile, error, validateAndSetFile } =
    useFileInput({
      accept: 'image/*,.pdf,.doc,.docx',
      maxSize: 5,
      onFileChange,
    });

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
          'rounded-md border border-dashed',
          'transition-colors duration-200',
          isDragging ? 'border-primary/50' : 'border-input',
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
          accept='image/*,.pdf,.doc,.docx'
          onChange={handleChange}
          className='hidden'
        />

        <div className='space-y-4 p-6'>
          {!file ? (
            <div className='flex flex-col items-center gap-2'>
              <div className='bg-accent flex items-center justify-center rounded-full p-3'>
                <Upload className='size-5' />
              </div>
              <p className='text-muted-foreground mt-1 text-sm'>
                Drag and drop or click to upload
              </p>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              {preview ? (
                <div className='relative h-16 w-16 overflow-hidden rounded-md'>
                  <img
                    src={preview}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div className='bg-accent flex h-16 w-16 items-center justify-center rounded-lg'>
                  <FileText className='h-8 w-8 text-zinc-400' />
                </div>
              )}
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{file.name}</p>
                <p className='text-xs text-zinc-500'>
                  {file.size
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : '0 MB'}
                </p>
                {uploadProgress < 100 && (
                  <div className='bg-accent mt-2 h-1 w-full overflow-hidden rounded-full'>
                    <div
                      className='bg-primary h-full transition-all duration-200'
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
                className='hover:bg-accent rounded p-1'
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
