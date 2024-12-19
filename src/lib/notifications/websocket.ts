
import { atom } from 'jotai'

export const wsConnectionAtom = atom<WebSocket | null>(null)
export const notificationsAtom = atom<Notification[]>([])

export const initializeWebSocket = (userId: string) => {
  const ws = new WebSocket(`wss://${window.location.hostname}/ws?userId=${userId}`)
  
  ws.onmessage = (event) => {
    const notification = JSON.parse(event.data)
    notificationsAtom.set((prev) => [...prev, notification])
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  wsConnectionAtom.set(ws)
  
  return () => {
    ws.close()
    wsConnectionAtom.set(null)
  }
}
