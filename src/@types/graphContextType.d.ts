import React, { MutableRefObject } from "react"
import IVertex from "./vertex"

export type GraphContextType = {
  vertexCount: number;
  setVertexCount: React.Dispatch<React.SetStateAction<number>>,
  vertices: IVertex[];
  setVertices: React.Dispatch<React.SetStateAction<IVertex[]>>,
  vertexIndices: IVertex[][];
  setVertexIndices: React.Dispatch<React.SetStateAction<IVertex[][]>>,
  adjMatrix: number[][],
  setAdjMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
}