import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { WebSocketContext, RoomContext } from "../../../context/";
import { leaveRoom } from "../../../utils/fetchUtils";
import GameSelect from "./GameSelect";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

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
  console.log(roomId);

  const {
    socket: webSocket,
    addSocket,
    closeSocket,
    sendMessage,
    mount,
    mounted,
    unmount,
  } = useContext(WebSocketContext);

  const { roomCredentials, dispatch, ACTION_TYPES } = useContext(RoomContext);

  const [selectedGame, setSelectedGame] = useState<string>("");

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
      <h2>{JSON.stringify(roomCredentials)}</h2>
      <GameSelect onSelect={(selected: string) => setSelectedGame(selected)} />
      <Link to='/'>
        <Button
          onClick={async () => {
            leaveRoom()
              .then((res: Response) => {
                if (res.ok && !!closeSocket) {
                  dispatch({ type: ACTION_TYPES.LEAVE_ROOM, payload: {} });
                  closeSocket();
                }
              })
              .catch((error: Error) => console.error(error));
          }}
        >
          Exit Room
        </Button>
      </Link>
    </Wrapper>
  );
};

export default RoomPage;
