import { env } from '@/config/env';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { toast } from 'sonner';

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(env.SOCKET_API_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Failed to connect to the server');
    });

    socket.on('WELCOME', (message) => {
      console.log('Connected to server:', message);
      toast.success(message);
    });

    // socket.on('FEEDBACK', (message) => {
    //   console.log('Received feedback:', message);
    //   toast.info(JSON.stringify(message));
    // });

    return () => {
      console.log('Unsubscribing useSocket');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const emit = useCallback(
    (event: string, data: any) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('Socket is not connected, cannot emit:', event);
      }
    },
    [isConnected],
  );

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      console.log('Subscribing to', event);
      socketRef.current.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event);
    }
  }, []);

  return { isConnected, emit, on, off };
}
