import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { GridContext } from "../contexts/GridContext";

const ButtonGroup = styled.nav``;

export default () => {
  const { grid, setGrid, gridDimensions }: any = useContext(GridContext);

  const handleGenerateWeights = (grid: any, setGrid: any) => {
    setGrid(() => {
      const rows = []
      for (let i = 0; i < gridDimensions.rows; i++) {
        rows.push(Array.from(Array(gridDimensions.columns), () => Math.ceil(Math.random() * 10)))
      }
      return rows;
    })
  }
  return (
    <ButtonGroup>
      <Button handleOnClick={() => handleGenerateWeights(grid, setGrid)} >Generate Weight</Button>
    </ButtonGroup>
  );
};
