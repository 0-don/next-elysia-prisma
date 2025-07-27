import type { WebSocket } from "ws";

const clients = new Set<WebSocket>();

export function SOCKET(
  client: WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer,
) {
  console.log("Client connected");
  clients.add(client);

  // Send welcome message
  client.send(
    JSON.stringify({
      type: "welcome",
      message: "Connected to WebSocket server",
    }),
  );

  client.on("message", (data) => {
    try {
      const message = data.toString();
      console.log("Received:", message);

      // Broadcast to all connected clients
      const response = JSON.stringify({
        type: "message",
        data: message,
        timestamp: Date.now(),
      });

      clients.forEach((c) => {
        if (c.readyState === c.OPEN && c !== client) {
          c.send(response);
        }
      });

      // Echo back to sender
      client.send(
        JSON.stringify({
          type: "echo",
          data: message,
          timestamp: Date.now(),
        }),
      );
    } catch (error) {
      console.error("Message handling error:", error);
    }
  });

  client.on("close", () => {
    console.log("Client disconnected");
    clients.delete(client);
  });

  client.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(client);
  });
}
