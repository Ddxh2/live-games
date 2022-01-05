import React, { createContext, useReducer, useEffect, Dispatch } from "react";
import { EnumType } from "typescript";

type UserState = string | null;

enum ActionType {
  LOG_IN,
  LOG_OUT,
}

type ActionInput = {
  type: ActionType;
  payload: any;
};

type UserContextType = {
  user: UserState;
  dispatch: Dispatch<ActionInput>;
  ACTION_TYPES: any;
};

const initialValue = {
  user: null,
  dispatch: () => {},
  ACTION_TYPES: ActionType,
};

const UserContext = createContext<UserContextType>(initialValue);

const reducer = (state: UserState, action: ActionInput): UserState => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.LOG_IN:
      return payload;
    case ActionType.LOG_OUT:
      return null;
    default:
      console.log("Strange");
      return state;
  }
};

const UserProvider: React.FC = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    const userSessionCookie: string | undefined = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("USER_SESSION"));

    if (!!userSessionCookie) {
      const username: string = userSessionCookie.split("%3D%2523s")[1];
      dispatch({ type: ActionType.LOG_IN, payload: username });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch, ACTION_TYPES: ActionType }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
