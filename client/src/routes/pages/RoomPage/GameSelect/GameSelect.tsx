import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import styled from "styled-components";

import { getAllGames } from "../../../../utils/fetchUtils";
import { snakeToProperCase } from "../../../../utils/stringUtils";

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;

const Select = styled.select`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  box-shadow: 0 0 1px 5px black;
  border-radius: 5px;
  padding: 5px 8px 5px 8px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Submit = styled.input.attrs({
  type: "submit",
})`
  background: grey;
  font-size: 14px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type GameSelectProps = {
  onSelect: (...args: any[]) => void;
};

const GameSelect: React.FC<GameSelectProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<string[]>();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    onSelect(selectedOption);
  };

  useEffect(() => {
    getAllGames()
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data: string[]) => setOptions(data))
      .catch((e: Error) => console.log(e));
  }, []);

  useEffect(() => {
    console.log("selected", selectedOption);
  }, [selectedOption]);
  return (
    <Wrapper>
      <Label htmlFor='gameSelect'>Choose a Game to Play</Label>
      <Select
        id='gameSelect'
        name='gameSelect'
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setSelectedOption(e.target.value);
        }}
        defaultValue={""}
      >
        <option value='' key='default'>
          None
        </option>
        {options?.map((option) => (
          <option value={option} key={option}>
            {snakeToProperCase(option)}
          </option>
        ))}
      </Select>
      <Submit
        disabled={selectedOption === ""}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          e.stopPropagation();
          e.preventDefault();
          handleSubmit();
        }}
      />
    </Wrapper>
  );
};

export default GameSelect;
