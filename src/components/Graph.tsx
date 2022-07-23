import { useContext } from "react";
import styled from "styled-components";
import { GraphContextType } from "../@types/graphContextType";
import IGridDimensions from "../@types/gridDimensions";
import IVertex from "../@types/vertex";
import { GraphContext } from "../contexts/GraphContext";
import { numberOfEdges } from "../hooks/useGraph";
import Vertex from "./Vertex";

const Graph = styled.div<IGridDimensions>`
  display: grid;

  grid-template-rows: repeat(${(p) => p.rows}, 2rem);
  grid-template-columns: repeat(${(p) => p.columns}, 2rem);
  gap: 1px;
  //makes the grid width relative to sum of all node pixels
  width: calc(${(p) => p.columns} * 2rem + ${(p) => p.columns} * 1px);
  //background-color: ${(p) => p.theme.backgroundColor};
  font-size: 1rem;
`;

const Line = styled.div`
  border-left: 2px solid teal;
  height: 2rem;
  position:absolute;
  left: 50%;
`;


export default () => {
  const graph = useContext(GraphContext) as GraphContextType;

  return (
    <Graph rows={graph.vertexIndices.length} columns={graph.vertexIndices[0].length}>
      {
        graph.vertexIndices.map((row: any, rowIdx: number) =>
          row.map((vertex: IVertex, colIdx: number) => {
            return (
              <>
                <Vertex key={`${rowIdx}-${colIdx}`} id={{ rowIdx, colIdx }} vertex={vertex} />
                <Line />
              </>
            )
          }
          )
        )
      }
    </Graph>
  );
};
