import { useEffect, useRef, useState } from "react";

interface WebSocketMessage {
  type: "welcome" | "message" | "echo";
  data?: string;
  message?: string;
  timestamp?: number;
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/ws`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      try {
        const parsed: WebSocketMessage = JSON.parse(event.data);

        if (parsed.type === "welcome") {
          setMessages((prev) => [...prev, `System: ${parsed.message}`]);
        } else if (parsed.type === "message") {
          setMessages((prev) => [...prev, `User: ${parsed.data}`]);
        } else if (parsed.type === "echo") {
          setMessages((prev) => [...prev, `Echo: ${parsed.data}`]);
        }
      } catch {
        // Fallback for non-JSON messages
        setMessages((prev) => [...prev, event.data]);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
}
