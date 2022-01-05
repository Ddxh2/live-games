import React, {
  useState,
  useMemo,
  useEffect,
  MouseEvent,
  useContext,
} from "react";
import styled from "styled-components";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { openRoom, joinRoom } from "../../../utils/fetchUtils";
import { Form, InputConfig, TextInput, ButtonInput } from "../../../components";
import { RoomContext } from "../../../context";

const Wrapper = styled.article`
  padding: 50px;
  background: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BackButton = styled.button`
  border: none;
  border-radius: 5px;
  background: lightgreen;
  color: grey;
  cursor: pointer;

  &::after {
    content: "<- Back";
  }
  &:hover {
    background: green;
    color: lightgrey;
  }
`;

const Body = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const FormSelectButton = styled.button`
  border: none;
  border-radius: 5px;
  background: grey;
  color: white;
  font-weight: 900;
  font-size: 25px;
  box-shadow: 0px 0px 5px 2px #ddd;
  width: 250px;
  height: 250px;
  cursor: pointer;
  &:enabled:hover {
    background: lightgrey;
    color: black;
    box-shadow: 0px 0px 5px 2px #555;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

type RoomCredentials = {
  roomId?: string;
  roomKey?: string;
};

enum Forms {
  OPEN,
  JOIN,
}

const LandingPage: React.FC<any> = () => {
  const navigate: NavigateFunction = useNavigate();

  const [selectedForm, setSelectedForm] = useState<Forms | null>(null);
  const [roomCredentials, setRoomCredentials] =
    useState<RoomCredentials | null>(null);
  const [joiningRoom, setJoiningRoom] = useState<boolean>(false);

  const { dispatch, ACTION_TYPES } = useContext(RoomContext);

  const handleOpenRoom = () => {
    openRoom()
      .then(async (res: Response) => {
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      })
      .then((data: string[]) => {
        setRoomCredentials({ roomId: data[0], roomKey: data[1] });
        setJoiningRoom(true);
      })
      .catch((error: Error) => console.error(error));
  };

  const joinRoomFormConfig = useMemo<InputConfig[]>(
    () => [
      {
        Component: TextInput,
        props: {
          label: "Room Id",
          onChangeCallback: (roomId: string) =>
            setRoomCredentials((prev) => ({ ...prev, roomId })),
          inputId: "roomId",
        },
      },
      {
        Component: TextInput,
        props: {
          label: "Room Key",
          onChangeCallback: (roomKey: string) =>
            setRoomCredentials((prev) => ({ ...prev, roomKey })),
          inputId: "roomKey",
        },
      },
      {
        Component: ButtonInput,
        props: {
          label: "Join Room",
          onSubmitCallback: (event: MouseEvent<HTMLInputElement>) => {
            event.preventDefault();
            event.stopPropagation();

            setJoiningRoom(true);
            setSelectedForm(null);
          },
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (
      !!roomCredentials &&
      !!roomCredentials.roomKey &&
      !!roomCredentials.roomId &&
      joiningRoom
    ) {
      const { roomId, roomKey } = roomCredentials;
      joinRoom(roomId, roomKey)
        .then((res: Response) => {
          if (res.ok) {
            dispatch({
              type: ACTION_TYPES.JOIN_ROOM,
              payload: roomCredentials,
            });
            navigate(`/room/${roomId}`);
            setJoiningRoom(false);
          }
        })
        .catch((error: Error) => console.error(error));
    }
  }, [roomCredentials, joiningRoom, navigate]);
  return (
    <Wrapper>
      {!!selectedForm && (
        <Header>
          <BackButton onClick={() => setSelectedForm(null)} />
        </Header>
      )}
      <Body>
        {selectedForm === Forms.JOIN ? (
          <Form title='Join Room' inputs={joinRoomFormConfig} />
        ) : (
          <>
            <FormSelectButton
              onClick={() => {
                setSelectedForm(Forms.OPEN);
                handleOpenRoom();
              }}
            >
              Open Room
            </FormSelectButton>
            <FormSelectButton
              disabled={selectedForm === Forms.OPEN}
              onClick={() => setSelectedForm(Forms.JOIN)}
            >
              Join Room
            </FormSelectButton>
          </>
        )}
      </Body>
    </Wrapper>
  );
};

export default LandingPage;
