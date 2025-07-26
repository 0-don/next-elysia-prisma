import { decrypt } from "@/lib/jwt";
import { Elysia } from "elysia";

export const wsRoute = new Elysia().ws("/ws", {
  message(ws, message) {
    ws.send(`Echo: ${message}`);
  },

  async open(ws) {
    const token = ws.data.query.token;
    if (token) {
      const user = await decrypt(token);
      if (user) {
        (ws.data as any).user = user;
        ws.send(JSON.stringify({ type: "auth", status: "success" }));
      }
    }
  },

  close(ws) {
    console.log("WebSocket disconnected");
  },
});
