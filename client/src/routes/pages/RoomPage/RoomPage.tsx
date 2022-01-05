import React, { useContext, ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { WebSocketContext } from "../../../context/WebSocket";
import GameSelect from "./GameSelect";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const FormSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const InputField = styled.input``;

const Button = styled.button`
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 5px;

  color: white;
  font-size: 14px;
  font-weight: 800;

  background: lightgrey;
  cursor: pointer;
`;

const RoomPage: React.FC<any> = () => {
  const { roomId } = useParams();
  const {
    socket: webSocket,
    addSocket,
    closeSocket,
    sendMessage,
    mount,
    mounted,
    unmount,
  } = useContext(WebSocketContext);

  const [selectedGame, setSelectedGame] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [messageLog, setMessageLog] = useState<string[]>([]);

  useEffect(() => {
    if (!!addSocket && !!roomId) {
      addSocket(roomId || "");
    }
  }, [addSocket, roomId]);

  useEffect(() => {
    if (!!webSocket && !mounted && !!mount) {
      const onOpen = () => console.log("connected");
      const onClose = () => console.log("disconnected");
      const onMessage = (event: MessageEvent<any>) => {
        console.log("Received Message", event.data);
        setMessageLog((prev) => [...prev, event.data]);
      };
      const onError = () => console.error("There has been an error");

      mount(onOpen, onClose, onMessage, onError);
    }
  }, [webSocket, mount, mounted]);

  useEffect(
    () => () => {
      if (!!unmount) {
        console.log("unmounting");
        unmount();
      }
    },
    [unmount, closeSocket]
  );
  useEffect(
    () => () => {
      if (!!closeSocket) {
        console.log("closing");
        closeSocket();
      }
    },
    [closeSocket]
  );

  useEffect(() => {
    if (!!selectedGame && sendMessage) {
      const payload = { type: "SELECT_GAME", payload: selectedGame };
      sendMessage(JSON.stringify(payload));
    }
  }, [selectedGame, sendMessage]);
  return (
    <Wrapper>
      <h1>In a Room: {roomId}</h1>
      <GameSelect onSelect={(selected: string) => setSelectedGame(selected)} />

      {/* <FormSection>
        <InputField
          value={message}
          placeholder='Write a Message...'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <Button
          onClick={() => {
            if (!!sendMessage) {
              sendMessage(message);
              setMessage("");
            }
          }}
        >
          Send Message{" "}
        </Button>
      </FormSection> */}
      <Link to='/'>
        <Button
          onClick={() => {
            if (!!closeSocket) {
              closeSocket();
            }
          }}
        >
          Exit Room
        </Button>
      </Link>
      {/* <ul>
        {messageLog?.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> */}
    </Wrapper>
  );
};

export default RoomPage;
