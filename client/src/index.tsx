import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { WebSocketProvider } from "./context/WebSocket";
import { UserProvider } from "./context/User";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
