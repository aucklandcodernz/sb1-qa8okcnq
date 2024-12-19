
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
