import { type ConvexHullPoint, computeConvexHull } from '@/utils/convex-hull';
import { useCallback, useEffect, useRef, useState } from 'react';

type DrawingMode = 'highlight' | 'eraser';

const HIGHLIGHT_OPACITY = 0.5;
const HIGHLIGHT_SIZE = 15;

type UseImageHighlighterOptions = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  enabled: boolean;
  highlightColor: string;
  highlightOpacity?: number;
  highlightSize?: number;
};

export function useImageHighlighter({
  containerRef,
  imageRef,
  enabled,
  highlightColor,
  highlightOpacity = HIGHLIGHT_OPACITY,
  highlightSize = HIGHLIGHT_SIZE,
}: UseImageHighlighterOptions) {
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const maskContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const cursorContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<DrawingMode>('highlight');

  // highlighted points for convex hull calculation
  const highlightedPointsRef = useRef<ConvexHullPoint[]>([]);

  // Initialize canvases
  useEffect(() => {
    if (!enabled || !containerRef.current || !imageRef.current) return;

    // Create mask canvas if it doesn't exist
    if (!maskCanvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none'; // Don't capture events on this canvas
      canvas.style.opacity = highlightOpacity.toString();
      canvas.style.mixBlendMode = 'multiply'; // This blend mode works well for highlighting
      maskCanvasRef.current = canvas;
      containerRef.current.appendChild(canvas);
    }

    // Create cursor/interaction canvas if it doesn't exist
    if (!cursorCanvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'all'; // This canvas captures all events
      canvas.style.cursor = 'none'; // Hide the default cursor on this canvas
      cursorCanvasRef.current = canvas;
      containerRef.current.appendChild(canvas);
    }

    const resizeCanvases = () => {
      if (imageRef.current && containerRef.current) {
        const rect = imageRef.current.getBoundingClientRect();

        // Resize mask canvas
        if (maskCanvasRef.current) {
          maskCanvasRef.current.width = rect.width;
          maskCanvasRef.current.height = rect.height;
          maskCanvasRef.current.style.width = `${rect.width}px`;
          maskCanvasRef.current.style.height = `${rect.height}px`;

          // Set up mask context
          const context = maskCanvasRef.current.getContext('2d');
          if (context) {
            maskContextRef.current = context;
          }
        }

        // Resize cursor canvas
        if (cursorCanvasRef.current) {
          cursorCanvasRef.current.width = rect.width;
          cursorCanvasRef.current.height = rect.height;
          cursorCanvasRef.current.style.width = `${+rect.width / 2}px`;
          cursorCanvasRef.current.style.height = `${+rect.height / 2}px`;

          // Set up cursor context
          const context = cursorCanvasRef.current.getContext('2d');
          if (context) {
            cursorContextRef.current = context;
          }
        }
      }
    };

    // Initial sizing
    resizeCanvases();

    // Handle resize
    const observer = new ResizeObserver(resizeCanvases);
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
      if (containerRef.current) {
        if (maskCanvasRef.current) {
          containerRef.current.removeChild(maskCanvasRef.current);
          maskCanvasRef.current = null;
        }
        if (cursorCanvasRef.current) {
          containerRef.current.removeChild(cursorCanvasRef.current);
          cursorCanvasRef.current = null;
        }
        maskContextRef.current = null;
        cursorContextRef.current = null;
      }
    };
  }, [enabled, containerRef, imageRef, highlightOpacity]);

  // Drawing handlers
  const startDrawing = useCallback(
    (x: number, y: number) => {
      if (!maskContextRef.current || !enabled) return;

      setIsDrawing(true);
      const ctx = maskContextRef.current;

      if (mode === 'highlight') {
        // Track point for convex hull
        highlightedPointsRef.current.push({ x, y });

        ctx.fillStyle = highlightColor;
        ctx.beginPath();
        ctx.arc(x, y, highlightSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (mode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, highlightSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    },
    [enabled, highlightColor, highlightSize, mode],
  );

  const draw = useCallback(
    (x: number, y: number) => {
      if (!maskContextRef.current || !isDrawing || !enabled) return;

      const ctx = maskContextRef.current;

      if (mode === 'highlight') {
        // Track point for convex hull
        highlightedPointsRef.current.push({ x, y });

        ctx.fillStyle = highlightColor;
        ctx.beginPath();
        ctx.arc(x, y, highlightSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (mode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, highlightSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    },
    [enabled, highlightColor, highlightSize, isDrawing, mode],
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Update the cursor visualization
  const updateCursor = useCallback(
    (x: number, y: number) => {
      if (!cursorContextRef.current || !enabled) return;

      const ctx = cursorContextRef.current;

      // Clear previous cursor
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw new cursor
      ctx.beginPath();
      ctx.strokeStyle = mode === 'highlight' ? highlightColor : '#ff0000'; // for eraser
      ctx.lineWidth = 2;
      ctx.arc(x, y, highlightSize, 0, Math.PI * 2);
      ctx.stroke();

      if (mode === 'highlight') {
        // Semi-transparent fill to preview the highlight
        ctx.fillStyle = `${highlightColor}44`; // Add alpha for better visibility
        ctx.fill();
      } else if (mode === 'eraser') {
        // Cross for eraser
        ctx.beginPath();
        ctx.moveTo(x - highlightSize / 2, y);
        ctx.lineTo(x + highlightSize / 2, y);
        ctx.moveTo(x, y - highlightSize / 2);
        ctx.lineTo(x, y + highlightSize / 2);
        ctx.stroke();
      }
    },
    [enabled, mode, highlightColor, highlightSize],
  );

  // Mouse event handlers
  useEffect(() => {
    if (!cursorCanvasRef.current || !enabled) return;

    const getCoordinates = (
      event: MouseEvent | TouchEvent,
    ): { x: number; y: number } => {
      const canvas = cursorCanvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ('touches' in event) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const { x, y } = getCoordinates(event);
      startDrawing(x, y);
      // Keep showing the cursor during drawing
      updateCursor(x, y);
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      const { x, y } = getCoordinates(event);

      // Update cursor position always
      updateCursor(x, y);

      // If drawing, draw on mask canvas
      if (isDrawing) {
        event.preventDefault();
        draw(x, y);
      }
    };

    const handleMouseUp = (event: MouseEvent | TouchEvent) => {
      const { x, y } = getCoordinates(event);
      stopDrawing();
      // Make sure cursor stays visible after drawing
      updateCursor(x, y);
    };

    const handleMouseOut = () => {
      if (cursorContextRef.current) {
        cursorContextRef.current.clearRect(
          0,
          0,
          cursorContextRef.current.canvas.width,
          cursorContextRef.current.canvas.height,
        );
      }
      stopDrawing();
    };

    const canvas = cursorCanvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseOut);

    // Touch events
    canvas.addEventListener('touchstart', handleMouseDown, { passive: false });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseOut);

      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, [draw, enabled, isDrawing, startDrawing, stopDrawing, updateCursor]);

  // Method to clear the canvas
  const clearCanvas = useCallback(() => {
    if (maskCanvasRef.current && maskContextRef.current) {
      maskContextRef.current.clearRect(
        0,
        0,
        maskCanvasRef.current.width,
        maskCanvasRef.current.height,
      );
      // Clear all tracked points
      highlightedPointsRef.current = [];
    }
  }, []);

  // Get highlighted regions
  const getHighlightedRegions = () => {
    const points = highlightedPointsRef.current;

    if (points.length < 3) {
      return null; // Need at least 3 points for a convex hull
    }

    // Get canvas dimensions for normalization
    const width = maskCanvasRef.current?.width || 1;
    const height = maskCanvasRef.current?.height || 1;

    try {
      // Use our own convex hull algorithm instead of the library
      const hullPoints = computeConvexHull(points);

      // Convert to normalized format
      const normalizedHull = hullPoints.map((p) => ({
        x: p.x / width,
        y: p.y / height,
      }));

      return {
        type: 'convex_hull',
        points: normalizedHull,
        // Original dimensions for reference
        originalDimensions: {
          width,
          height,
        },
      };
    } catch (error) {
      console.error('Error computing convex hull:', error);

      // Fallback to returning all points if there's an error
      return {
        type: 'points',
        points: points.map((p) => ({ x: p.x / width, y: p.y / height })),
        originalDimensions: { width, height },
      };
    }
  };

  return {
    setMode,
    clearCanvas,
    currentMode: mode,
    getHighlightedRegions,
  };
}
