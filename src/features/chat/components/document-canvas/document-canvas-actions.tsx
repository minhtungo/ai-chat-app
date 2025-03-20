import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

type DocumentCanvasActionsProps = React.ComponentProps<'div'> & {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};

export function DocumentCanvasActions({
  currentPage,
  numPages,
  setCurrentPage,
  scale,
  setScale,
}: DocumentCanvasActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          size='sm'
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className='size-7'
        >
          <ChevronLeft className='size-4' />
        </Button>
        <span className='text-sm'>
          {currentPage} of {numPages}
        </span>
        <Button
          variant='secondary'
          size='sm'
          onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
          disabled={currentPage >= numPages}
          className='size-7'
        >
          <ChevronRight className='size-4' />
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          size='sm'
          onClick={() => setScale(scale - 0.2)}
          className='size-7'
        >
          <ZoomOut className='size-4' />
        </Button>
        <Button
          variant='secondary'
          size='sm'
          onClick={() => setScale(scale + 0.2)}
          className='size-7'
        >
          <ZoomIn className='size-4' />
        </Button>
      </div>
    </div>
  );
}
