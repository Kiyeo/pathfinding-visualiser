import React, { useState } from "react";
import styled from "styled-components";
import Node from "./Node";

interface GridDimensions {
  rows: number;
  columns: number;
}

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
  const gridDimensions: GridDimensions = {
    rows: 25,
    columns: 50,
  };
  const [grid, _] = useState(
    Array.from({ length: gridDimensions.rows }).map(() =>
      Array.from({ length: gridDimensions.columns }).fill(0)
    )
  );

  return (
    <Grid rows={gridDimensions.rows} columns={gridDimensions.columns}>
      {grid.map((rows, rowIndex) =>
        rows.map((_, colIndex) => <Node key={`${rowIndex}-${colIndex}`} />)
      )}
    </Grid>
  );
};
