import React, { useContext } from "react";
import styled from "styled-components";
import Node from "./Node";
import NodeType from "../node";
import GridDimensions from "../griddimensions";
import { GridContext } from "../contexts/GridContext";

const Grid = styled.div<GridDimensions>`
  display: grid;

  grid-template-rows: repeat(${(p) => p.rows}, 2rem);
  grid-template-columns: repeat(${(p) => p.columns}, 2rem);
  gap: 1px;
  //makes the grid width relative to sum of all node pixels
  width: calc(${(p) => p.columns} * 2rem + ${(p) => p.columns} * 1px);
  background-color: ${(p) => p.theme.backgroundColor};
  font-size: 1rem;
`;

export default () => {
  const { grid, gridDimensions }: any = useContext(GridContext);
  return (
    <Grid rows={gridDimensions.rows} columns={gridDimensions.columns}>
      {grid.map((rows: any, rowIndex: any) =>
        rows.map((node: NodeType, colIndex: any) => <Node key={`${rowIndex}-${colIndex}`} >{node.weight}</Node>)
      )}
    </Grid>
  );
};
