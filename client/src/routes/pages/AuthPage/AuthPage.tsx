import React, { ChangeEvent, MouseEvent, useState, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../../context/User";
import { logOn } from "../../../utils/fetchUtils";

const Wrapper = styled.form`
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  background-color: green;
  height: 100%;
  width: 100%;
`;

const Header = styled.h1`
  color: lightgrey;
  font-size: 60px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const InputLabel = styled.label`
  font-weight: 900;
  font-size: 25px;
  color: lightgrey;
  &::after {
    content: ":";
  }
`;

const SubmitButton = styled.input.attrs(() => ({ type: "submit" }))`
  border: none;
  border-radius: 5px;
  background: lightgrey;
  color: black;
  cursor: pointer;

  &:enabled:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const InputField = styled.input``;

type AuthPageProps = {
  onSubmit: (...args: any) => any;
};

const AuthPage: React.FC<AuthPageProps> = ({ onSubmit }) => {
  const { dispatch, ACTION_TYPES } = useContext(UserContext);
  const [username, setUsername] = useState<string>("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    logOn(username)
      .then((res: Response) => {
        if (res.ok) {
          dispatch({ type: ACTION_TYPES.LOG_IN, payload: username });
        }
      })
      .catch((e: Error) => console.error(e));
    onSubmit();
  };
  return (
    <Wrapper>
      <Header>Test</Header>
      <InputWrapper>
        <InputLabel htmlFor='username'>Username</InputLabel>
        <InputField
          id='username'
          name='username'
          value={username}
          onChange={handleUsernameChange}
        />
      </InputWrapper>
      <SubmitButton
        disabled={!username}
        onClick={handleSubmit}
        value='Log In'
      />
    </Wrapper>
  );
};

AuthPage.defaultProps = {
  onSubmit: () => {},
};

export default AuthPage;
