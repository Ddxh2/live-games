import React from "react";
import styled from "styled-components";
import { InputConfig } from "./InputConfig";

type WrapperProps = {
  layout?: string;
};
const Wrapper = styled.form<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex-direction: column;

  ${({ layout }) => (!!layout ? layout : "")}
`;

const Header = styled.h1`
  font-size: 25px;
  font-weight: 900;
`;

type FormProps = {
  inputs: InputConfig[];
  title?: string;
  layout?: string;
};

const Form: React.FC<FormProps> = ({ inputs, title, layout }) => {
  return (
    <Wrapper layout={layout}>
      {!!title && <Header>{title}</Header>}
      {inputs?.map(({ Component, props }, index) => (
        <Component key={index} {...props} />
      ))}
    </Wrapper>
  );
};

export default Form;
