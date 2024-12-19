
export class NotificationService {
  private ws: WebSocket | null = null
  private subscribers: Set<(data: any) => void> = new Set()

  connect() {
    this.ws = new WebSocket(`ws://${window.location.hostname}:8080`)
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      this.subscribers.forEach(subscriber => subscriber(data))
    }

    this.ws.onclose = () => {
      setTimeout(() => this.connect(), 1000)
    }
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }
}

export const notificationService = new NotificationService()
import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(userId: string) {
    this.socket = io(import.meta.env.VITE_WS_URL || 'ws://0.0.0.0:3001', {
      query: { userId },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
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
