"use client";

import { useWebSocket } from "@/hooks/websocket-hook";

export default function ChatComponent() {
  const { isConnected, messages, sendMessage } = useWebSocket();

  return (
    <div>
      <div>Status: {isConnected ? "Connected" : "Disconnected"}</div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <button onClick={() => sendMessage("Hello!")}>Send Message</button>
    </div>
  );
}
