import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useCanvas } from '@/features/canvas/store/canvas-store';
import { ChatHistory } from '@/features/chat/components/chat-history';
import { ChatPanel } from '@/features/chat/components/chat-panel';
import { DocumentCanvas } from '@/features/chat/components/document-canvas';
import { ImageCanvas } from '@/features/chat/components/image-canvas';
import { WebcamPreview } from '@/features/chat/components/webcam-recorder/webcam-preview';
import { cn } from '@/utils/cn';

type CanvasScreenProps = React.ComponentProps<'div'> & {};

export function CanvasScreen({ className, ...props }: CanvasScreenProps) {
  const { isOpen, type, attachment } = useCanvas();

  if (!isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (type) {
      case 'webcam':
        return <WebcamPreview className='h-full' />;
      case 'document':
        return <DocumentCanvas attachment={attachment} />;
      case 'image':
        return <ImageCanvas attachment={attachment} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn('bg-background fixed inset-0 z-50', className)}
      {...props}
    >
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel
          defaultSize={65}
          className='relative flex flex-col'
          minSize={30}
        >
          {renderContent()}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          className='flex min-w-[350px] flex-col'
        >
          <ChatHistory className='px-4 pt-4 pb-10' />
          <ChatPanel className='px-4' />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
