import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";

import { openRoom, joinRoom } from "../../../utils/fetchUtils";

const Wrapper = styled.form`
  background: orange;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingPage: React.FC<any> = () => {
  const navigate: NavigateFunction = useNavigate();
  return <Wrapper></Wrapper>;
};

export default LandingPage;
