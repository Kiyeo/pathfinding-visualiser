import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { GridContext } from "../contexts/GridContext";

const ButtonGroup = styled.nav``;

export default () => {
  const { setGrid, gridDimensions }: any = useContext(GridContext);

  const handleGenerateWeights = (setGrid: any) => {
    setGrid(() =>
      Array.from({ length: gridDimensions.rows }).map(() =>
        Array.from({ length: gridDimensions.columns }, () =>
        (
          {
            weight: Math.ceil(Math.random() * 10),
            isStart: false,
            isFinish: false,
          }
        ))));
  }
  return (
    <ButtonGroup>
      <Button handleOnClick={() => handleGenerateWeights(setGrid)} >Generate Weight</Button>
    </ButtonGroup>
  );
};
