"use strict";
// import { WebSocketServer, WebSocket } from "ws";
Object.defineProperty(exports, "__esModule", { value: true });
// const wss = new WebSocketServer({ port: 8080 });
// wss.on("connection", function (socket) {
//   console.log("user connected");
//   socket.on("message", (e) => {
//     console.log(e.toString());
//     if (e.toString() === "ping") {
//       socket.send("pong");
//     }
//   });
// });
// Import the WebSocketServer class from the "ws" library
const ws_1 = require("ws");
// Create a new WebSocket server instance on port 8000
const wss = new ws_1.WebSocketServer({ port: 8000 });
// Add an event listener for new client connections
wss.on("connection", function (socket) {
    // Add an event listener for messages received from the connected client
    socket.on("message", (e) => {
        const data = e.toString().trim();
        // Check if the message received is "ping"
        console.log(data);
        console.log(data === "jatin");
        if (data === "jatin") {
            // Respond with "pong" to the client
            socket.send("pong");
        }
    });
});
