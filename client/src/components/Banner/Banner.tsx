import React, { MouseEvent, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../context/User";
import { logOut } from "../../utils/fetchUtils";

const Wrapper = styled.header`
  position: sticky;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 100%;
  background: red;
`;

type WelcomeMessageProps = {
  username: string;
};

const WelcomeMessage = styled.h1<WelcomeMessageProps>`
  font-weight: 900;
  color: blue;
  grid-column-start: 2;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "Welcome ${({ username }) => username}!";
  }
`;

const LogOutButtonWrapper = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 25px;
`;

const LogOutButton = styled.input.attrs(() => ({
  type: "submit",
  value: "Log Out",
}))`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 800;
  color: white;
  background: black;

  &:enabled:hover {
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  display: block;
`;

const Banner = () => {
  const { user, dispatch, ACTION_TYPES } = useContext(UserContext);

  const handleLogOut = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    logOut()
      .then((res: Response) => {
        if (res.ok) {
          dispatch({ type: ACTION_TYPES.LOG_OUT, payload: null });
        }
      })
      .catch((error: Error) => console.error(error));
  };
  return (
    <Wrapper>
      {!!user && <WelcomeMessage username={user} />}
      <LogOutButtonWrapper>
        <LogOutButton onClick={handleLogOut} disabled={!user} />
      </LogOutButtonWrapper>
    </Wrapper>
  );
};

export default Banner;
