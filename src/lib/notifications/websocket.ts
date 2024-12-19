
import { io, Socket } from 'socket.io-client';
import type { Notification } from '@prisma/client';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;

  private constructor() {
    if (typeof window === 'undefined') return;
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(userId: string) {
    if (this.socket?.connected) return;
    if (typeof window === 'undefined') return;

    try {
      this.socket = io(import.meta.env.VITE_WS_URL || 'ws://0.0.0.0:3001', {
        query: { userId },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    } catch (error) {
      console.error('WebSocket initialization error:', error);
    }
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  unsubscribe(event: string) {
    if (!this.socket) return;
    this.socket.off(event);
  }

  emit(event: string, data: any) {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const webSocketService = WebSocketService.getInstance();
