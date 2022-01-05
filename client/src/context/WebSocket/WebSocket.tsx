import React, { createContext, useMemo, useState } from "react";
import { Endpoints } from "../../utils/fetchUtils";

interface WebSocketContextType {
  socket: WebSocket | null;
  addSocket?: (roomId: string) => void;
  closeSocket?: () => void;
  sendMessage?: (message: string) => void;
  mount?: (
    onOpen: () => void,
    onClose: () => void,
    onMessage: (event: MessageEvent<any>) => void,
    onError: () => void
  ) => void;
  mounted: boolean;
  unmount?: () => void;
}

const initialWebSocket: WebSocketContextType = {
  socket: null,
  mounted: false,
};

const WebSocketContext = createContext({ ...initialWebSocket });

const WebSocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const { addSocket, closeSocket } = useMemo(() => {
    const addSocket = (roomId: string) => {
      const webSocketUrl = `ws://${process.env.REACT_APP_SERVER}/${Endpoints.enterRoom}/${roomId}`;
      setSocket((prev) => {
        if (!prev) {
          return new WebSocket(webSocketUrl);
        } else {
          return prev;
        }
      });
    };

    const closeSocket = () =>
      setSocket((prev) => {
        prev?.close();
        return null;
      });

    return { addSocket, closeSocket };
  }, []);
  const { sendMessage, mount, unmount } = useMemo(() => {
    const sendMessage = (message: string) => {
      try {
        if (!!socket) {
          socket.send(message);
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    const mount = (
      onOpen: () => void,
      onClose: () => void,
      onMessage: (event: MessageEvent<any>) => void,
      onError: () => void
    ) => {
      if (!!socket) {
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onmessage = onMessage;
        socket.onerror = onError;
        setMounted(true);
      }
    };

    const unmount = () => {
      if (!!socket) {
        socket.onopen = () => {};
        socket.onclose = () => {};
        socket.onmessage = () => {};
        socket.onerror = () => {};
        setMounted(false);
      }
    };

    return { sendMessage, mount, unmount };
  }, [socket]);
  return (
    <WebSocketContext.Provider
      value={{
        socket,
        addSocket,
        closeSocket,
        sendMessage,
        mount,
        mounted,
        unmount,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
