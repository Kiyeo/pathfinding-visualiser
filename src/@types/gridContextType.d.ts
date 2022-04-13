import React, { MutableRefObject } from "react"
import IGridDimensions from "./gridDimensions"
import INode from "./node"

export type GridContextType = {
  grid: INode[][],
  setGrid: React.Dispatch<React.SetStateAction<INode[][]>>,
  gridDimensions: IGridDimensions,
  startNode: MutableRefObject<INode>,
  finishNode: MutableRefObject<INode>
}