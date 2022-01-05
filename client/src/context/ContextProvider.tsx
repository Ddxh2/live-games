import React from "react";

import { UserProvider, RoomProvider, WebSocketProvider } from ".";

const ContextProvider: React.FC = ({ children }) => (
  <UserProvider>
    <RoomProvider>
      <WebSocketProvider>{children}</WebSocketProvider>
    </RoomProvider>
  </UserProvider>
);

export default ContextProvider;
