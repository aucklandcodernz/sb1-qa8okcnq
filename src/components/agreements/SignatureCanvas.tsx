import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface SignatureCanvasProps {
  onChange?: (signatureData: string) => void;
  className?: string;
  width?: number;
  height?: number;
}

export default function SignatureCanvas({
  onChange,
  className,
  width = 400,
  height = 200,
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    setCtx(context);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;

    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setLastX(offsetX);
    setLastY(offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (onChange && canvasRef.current) {
      onChange(canvasRef.current.toDataURL());
    }
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }

    return {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    };
  };

  const clear = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        type="button"
        onClick={clear}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Clear Signature
      </button>
    </div>
  );
}