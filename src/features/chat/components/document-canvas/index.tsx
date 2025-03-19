import { CanvasActions } from '@/features/canvas/components/canvas-actions';
import { DocumentCanvasActions } from '@/features/chat/components/document-canvas/document-canvas-actions';
import type { Attachment } from '@/types/chat';
import { cn } from '@/utils/cn';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type DocumentCanvasProps = React.ComponentProps<'div'> & {
  attachment: Attachment | null;
  onUseSelectedText?: (text: string) => void;
};

export function DocumentCanvas({
  className,
  attachment,
  onUseSelectedText,
  ...props
}: DocumentCanvasProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <CanvasActions
        actions={
          <DocumentCanvasActions
            currentPage={currentPage}
            numPages={numPages}
            setCurrentPage={setCurrentPage}
            scale={scale}
            setScale={setScale}
          />
        }
      />
      <div className='flex h-full flex-1 items-start justify-center overflow-auto p-4 pt-12'>
        <div
          ref={containerRef}
          className={cn('relative', className)}
          {...props}
        >
          <Document
            file={attachment?.url}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              pageNumber={currentPage}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    </>
  );
}
