
import { Server } from 'socket.io';
import { createServer } from 'http';
import { prisma } from '../lib/db';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

interface ConnectedUser {
  userId: string;
  socketId: string;
}

const connectedUsers = new Map<string, ConnectedUser>();

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string;
  
  if (userId) {
    connectedUsers.set(userId, { userId, socketId: socket.id });
    console.log(`User connected: ${userId}`);
  }

  socket.on('disconnect', () => {
    if (userId) {
      connectedUsers.delete(userId);
      console.log(`User disconnected: ${userId}`);
    }
  });
});

export const notifyUser = async (userId: string, notification: any) => {
  const user = connectedUsers.get(userId);
  if (user) {
    io.to(user.socketId).emit('notification', notification);
  }

  // Store notification in database
  await prisma.notification.create({
    data: {
      userId,
      type: notification.type,
      message: notification.message,
      read: false
    }
  });
};

const PORT = process.env.WS_PORT || 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

export { io };
