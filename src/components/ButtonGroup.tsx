import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { GridContext } from "../contexts/GridContext";
import INode from "../@types/vertex";
import { GridContextType } from "../@types/gridContextType";

const ButtonGroup = styled.nav``;

export default () => {
  const { grid, setGrid, gridDimensions, startNode, finishNode } = useContext(GridContext) as GridContextType;

  const handleGenerateWeights = (setGrid: React.Dispatch<React.SetStateAction<INode[][]>>) => {
    setGrid(() =>
      Array.from({ length: gridDimensions.rows }).map((_, row) =>
        Array.from({ length: gridDimensions.columns }, (_, col): INode =>
        (
          {
            ...grid[row][col],
            //weight: Math.ceil(Math.random() * 10)
          }
        ))));
  }
  return (
    <ButtonGroup>
      <Button handleOnClick={() => handleGenerateWeights(setGrid)} >Generate Weight</Button>
    </ButtonGroup>
  );
};
