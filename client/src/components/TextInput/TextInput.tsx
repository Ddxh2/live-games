import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 800;
  font-size: 18px;

  &::after {
    content: ":";
  }
`;

const InputField = styled.input`
  border: none;
  border-radius: 3px;
  padding: 2px 5px 2px 5px;
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
