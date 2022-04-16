import React, { useContext, useState } from "react";
import styled from "styled-components";
import Node from "./Node";
import INode from "../@types/node";
import IGridDimensions from "../@types/gridDimensions";
import { GridContext } from "../contexts/GridContext";
import { GridContextType } from "../@types/gridContextType";

const Grid = styled.div<IGridDimensions>`
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
  const { grid, setGrid, gridDimensions, startNode, finishNode } = useContext(GridContext) as GridContextType;
  //const [nodeHistory, setNodeHistory] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const handleMouseEvent = () => {
    (e: React.BaseSyntheticEvent<PointerEvent, EventTarget & HTMLDivElement, EventTarget>) => {
      if (e) {
        const idList: number[] = (e.target as HTMLDivElement).id.split(" ").map(Number);
        const nodePoint: { nodeRow: number, nodeCol: number } = {
          nodeRow: idList[0],
          nodeCol: idList[1]
        }
        if (e.type === 'pointerdown') {
          setIsMouseDown(!isMouseDown);
          const currStartNode: INode = startNode.current
          const currFinishNode: INode = finishNode.current
        }

        //if (e.type === 'mouseenter' && isMouseDown) {
        //  console.log("mouse pressed and hold")
        //  setGrid((prevState: any): INode[][] => {
        //    const currStartNode: INode = startNode.current
        //    const currFinishNode: INode = finishNode.current
        //    const currNode = prevState[currNodePoint.nodeRow][currNodePoint.nodeCol]
        //    const prevNode = prevState[prevNodePoint.nodeRow][prevNodePoint.nodeCol]

        //    if (NodeType.start === prevNode.nodeType && NodeType.start !== currNode.nodeType && NodeType.finish !== currNode.nodeType) {
        //      prevState[currNodePoint.nodeRow][currNodePoint.nodeCol] = {
        //        ...currNode,
        //        nodeType: prevNode.nodeType,
        //      }

        //      prevState[prevNodePoint.nodeRow][prevNodePoint.nodeCol] = {
        //        ...prevNode,
        //        nodeType: currNode.nodeType
        //      }
        //    }
        //    return prevState
        //  }
        //  );
        //}

        if (e.type === 'pointerup') {
          setIsMouseDown(!isMouseDown);
        }
      }

    }
  }
  return (
    <Grid rows={gridDimensions.rows} columns={gridDimensions.columns}>
      {grid.map((rows: any, rowIndex: any) =>
        rows.map((node: INode, colIndex: any) => <Node key={`${rowIndex} ${colIndex}`} node={node}
          handleMouseEvent={() =>
            handleMouseEvent()
          }
        />)
      )}
    </Grid>
  );
};
