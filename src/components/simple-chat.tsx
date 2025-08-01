"use client";

import { useWebSocket } from "@/hooks/websocket-hook";
import { useState } from "react";

export default function SimpleChat() {
  const { isConnected, messages, sendMessage } = useWebSocket();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4 rounded-lg bg-gray-800 p-2">
        <span
          className={`text-sm ${isConnected ? "text-green-400" : "text-red-400"}`}
        >
          {isConnected ? "● Connected" : "● Disconnected"}
        </span>
      </div>

      <div className="mb-4 h-64 overflow-y-auto rounded-lg border border-gray-600 bg-gray-900 p-2">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500">No messages yet...</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="mb-2 text-sm">
              {msg}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded border border-gray-600 bg-gray-800 p-2 text-white"
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button
          onClick={handleSend}
          disabled={!isConnected || !input.trim()}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
