import React, { createContext, Dispatch, useEffect, useReducer } from "react";

type RoomCredentials = {
  roomId?: string;
  roomKey?: string;
};

type ActionInput = {
  type: ActionType;
  payload: any;
};

type RoomContextType = {
  roomCredentials?: RoomCredentials | null;
  dispatch: Dispatch<ActionInput>;
  ACTION_TYPES: any;
};

enum ActionType {
  JOIN_ROOM,
  LEAVE_ROOM,
}

const initialState: RoomContextType = {
  roomCredentials: null,
  dispatch: () => {},
  ACTION_TYPES: ActionType,
};

const RoomContext = createContext<RoomContextType>(initialState);

const reducer = (
  state: RoomCredentials,
  action: ActionInput
): RoomCredentials => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.JOIN_ROOM:
      localStorage.removeItem("roomCredentials");
      localStorage.setItem("roomCredentials", JSON.stringify(payload));
      console.log("join");
      return payload;
    case ActionType.LEAVE_ROOM:
      localStorage.removeItem("roomCredentials");
      console.log("leave");
      return {};
    default:
      console.error("Something has gone wrong");
      return state;
  }
};

const RoomProvider: React.FC = ({ children }) => {
  const [roomCredentials, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const roomCredentials = localStorage.getItem("roomCredentials");
    if (!!roomCredentials) {
      dispatch({
        type: ActionType.JOIN_ROOM,
        payload: JSON.parse(roomCredentials),
      });
    }
  }, []);
  return (
    <RoomContext.Provider
      value={{ roomCredentials, dispatch, ACTION_TYPES: ActionType }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
