import React, { MutableRefObject } from "react"
import IGridDimensions from "./gridDimensions"
import INode from "./vertex"

export type GridContextType = {
  grid: INode[][],
  setGrid: React.Dispatch<React.SetStateAction<INode[][]>>,
  gridDimensions: IGridDimensions,
  startNode: MutableRefObject<INode>,
  finishNode: MutableRefObject<INode>
}