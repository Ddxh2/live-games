import React, { MouseEvent } from "react";
import styled from "styled-components";

const Button = styled.input.attrs(() => ({ type: "Submit" }))`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 800;
  cursor: pointer;

  &:enabled:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

type ButtonInputProps = {
  label: string;
  onSubmitCallback: (event: MouseEvent<HTMLInputElement>) => any;
  disabled: boolean;
};

const ButtonInput: React.FC<ButtonInputProps> = ({
  label,
  onSubmitCallback,
  disabled,
}) => {
  return (
    <Button onClick={onSubmitCallback} value={label} disabled={disabled} />
  );
};

export default ButtonInput;
