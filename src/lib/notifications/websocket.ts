
import { io, Socket } from 'socket.io-client';
import { z } from 'zod';
import { queryClient } from '../query/queryClient';

const notificationSchema = z.object({
  type: z.enum(['INFO', 'WARNING', 'ERROR']),
  message: z.string(),
  data: z.any().optional(),
  timestamp: z.string().datetime(),
});

export class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

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
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
      });

      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocket initialization error:', error);
    }
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      queryClient.invalidateQueries(['notifications']);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.socket?.close();
      }
    });
  }

  subscribe<T>(event: string, callback: (data: T) => void) {
    if (!this.socket) return;
    
    this.socket.on(event, (data) => {
      try {
        const validatedData = notificationSchema.parse(data);
        callback(validatedData as T);
        queryClient.invalidateQueries(['notifications']);
      } catch (error) {
        console.error('Invalid notification format:', error);
      }
    });
  }

  unsubscribe(event: string) {
    if (!this.socket) return;
    this.socket.off(event);
  }

  emit(event: string, data: unknown) {
    if (!this.socket) return;
    try {
      const validatedData = notificationSchema.parse(data);
      this.socket.emit(event, validatedData);
    } catch (error) {
      console.error('Invalid notification format:', error);
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}

export const webSocketService = WebSocketService.getInstance();
