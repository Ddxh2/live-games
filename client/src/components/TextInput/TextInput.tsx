import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-column-gap: 10px;
`;

const Label = styled.label`
  font-weight: 800;
  font-size: 18px;
  grid-column-start: 1;
  grid-column-end: 2;
  &::after {
    content: ":";
  }
`;

const InputField = styled.input`
  border: none;
  border-radius: 3px;
  padding: 2px 5px 2px 5px;
  grid-column-start: 2;
  grid-column-end: 3;
`;

type InputProps = {
  label?: string;
  onChangeCallback?: (value: string) => any;
  inputId: string;
};

const TextInput: React.FC<InputProps> = ({
  label,
  onChangeCallback,
  inputId,
}) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValue(event.target.value);
    onChangeCallback?.(event.target.value);
  };
  return (
    <Wrapper>
      {!!label && <Label htmlFor={inputId}>{label}</Label>}
      <InputField
        id={inputId}
        name={inputId}
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

export default TextInput;
