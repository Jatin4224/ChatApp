import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    try {
      // Ensure the message is a string before parsing
      const message = data.toString();
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === "join") {
        allSockets.push({
          socket,
          room: parsedMessage.payload.roomId,
        });
      }

      if (parsedMessage.type === "chat") {
        const currentUser = allSockets.find((x) => x.socket === socket);
        if (!currentUser) return; // User not found

        const currentUserRoom = currentUser.room;

        // Broadcast message to all users in the same room
        allSockets
          .filter((user) => user.room === currentUserRoom)
          .forEach((user) => user.socket.send(parsedMessage.payload.message));
      }
    } catch (error) {
      console.error("Invalid JSON received:", data);
    }
  });
});
