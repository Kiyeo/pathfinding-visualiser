import { useEffect, useState } from "react";
import IVertex from "../@types/vertex";
import VertexType from "../VertexType";

interface IEdge {
  weight: number
}

export default (vertexCount: number) => {

  const [vertices, setVertices] = useState<IVertex[]>(generateVertices(vertexCount))

  const [vertexIndices, setVertexIndices] = useState<IVertex[][]>(generateVertexIndices(vertexCount, vertices))

  const [adjMatrix, setAdjMatrix] = useState<number[][]>((): number[][] =>
    generateEdges(vertexIndices, generateZeroAdjMatrix(vertexCount)))

  console.log(adjMatrix)
  console.log(vertexIndices)

  useEffect(() => {
    console.log("render")
    const vertices = generateVertices(vertexCount)
    setVertices(vertices)
    const vertexIndices = generateVertexIndices(vertexCount, vertices)
    setVertexIndices(vertexIndices)
    setAdjMatrix(generateEdges(vertexIndices, generateZeroAdjMatrix(vertexCount)))
    return () => {
      console.log("unmount")
    }
  }, [vertexCount])

  return { vertexCount, vertices, setVertices, vertexIndices, setVertexIndices, adjMatrix, setAdjMatrix }
}
/**
 * Generates a list of vertex objects
 * @param {number} vertexCount 
 * @returns {IVertex[]}
 */
const generateVertices = (vertexCount: number): IVertex[] =>
  Array.from({ length: vertexCount }, (_, colIdx): IVertex => ({
    name: colIdx,
    vertexType: VertexType.normal,
    prevVertex: null
  })
  )

/**
 * Generates a 2d array of vertex objects used for displaying the graph
 * 
 * 0 1 2
 * 3 4 5
 * 
 * 0 1 3 4
 * 5 6 7 8
 * 
 * @param {number} vertexCount 
 * @param {IVertex[]} vertices 
 * @returns {IVertex[][]}
 */
const generateVertexIndices = (vertexCount: number, vertices: IVertex[]): IVertex[][] => {
  const numberOfRows = vertexCount / (vertexCount / 2)
  return Array.from({ length: numberOfRows }).map((_, rowIdx) =>
    Array.from({ length: vertexCount / 2 }, (_, colIdx): IVertex => {
      const vertexNo = (rowIdx * numberOfRows) + colIdx
      return vertices[vertexNo]
    }
    )
  )
}

const generateGraph = (vertexCount: number, vertices: IVertex[], adjMatrix: number[][]): any => {
  const numberOfRows = Math.ceil(vertexCount / 2)
  let verticesCount = 0
  return Array.from({ length: numberOfRows + numberOfRows - 1 }).map((_, rowIdx) =>
    Array.from({ length: numberOfRows + numberOfRows - 1 }, (_, colIdx): any => {
      if (rowIdx != numberOfRows - 1) {
        const vertexNo = rowIdx >= 1 ? colIdx + numberOfRows : colIdx
        return vertices[vertexNo]
      }
    }
    )
  )
}

/**
 * Generates an adjacency matrix filled with zeros
 * @param {number} vertexCount 
 * @returns {number[][]}
 */
const generateZeroAdjMatrix = (vertexCount: number): number[][] => {
  return Array.from({ length: vertexCount }).map((_) =>
    Array.from({ length: vertexCount }, (_): number => 0))
}

/**
 * Counts the number of weighted edges in the graph
 * @param {number[][]} adjMatrix 
 * @returns {number}
 */
export const numberOfEdges = (adjMatrix: number[][]): number => {
  let count = 0
  for (let rowIdx = 0; rowIdx < adjMatrix.length; rowIdx++) {
    for (let colIdx = rowIdx; colIdx < adjMatrix.length; colIdx++) {
      if (adjMatrix[rowIdx][colIdx]) count++
    }
  }
  return count
}


/**
 * Generates the edges based on the 2d array of vertex objects graph display
 * |E| <= |V| <= |E| + 1
 * 
 * 0 - 1 - 2
 * |   |   |
 * 3 - 4 - 5
 * 
 * 0 - 1   2
 *   / | \  
 * 3   4   5  
 * 
 * @param {IVertex[][]} verticeIndices
 * @param {number[][]} initAdjMatrix
 * @returns {number[][]}
 * 
 */
const generateEdges = (verticeIndices: IVertex[][], initAdjMatrix: number[][]): number[][] => {
  const adjMatrix = JSON.parse(JSON.stringify(initAdjMatrix))
  const operations = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
  ]
  for (let rowIdx = 0; rowIdx < verticeIndices.length; rowIdx++) {
    for (let colIdx = rowIdx; colIdx < verticeIndices[rowIdx].length; colIdx++) {
      const vertexNo = verticeIndices[rowIdx][colIdx].name
      adjMatrix[vertexNo][vertexNo] = 0

      operations.forEach(([x, y]) => {
        const neighborX = rowIdx + x
        const neighborY = colIdx + y
        if (neighborX >= 0 && neighborX < verticeIndices.length && neighborY >= 0 && neighborY < verticeIndices[rowIdx].length) {
          const neighborVertexNo = verticeIndices[neighborX][neighborY].name
          const weight = Math.ceil(Math.random() * 10)
          adjMatrix[vertexNo][neighborVertexNo] = weight
          adjMatrix[neighborVertexNo][vertexNo] = weight
        }
      })
    }
  }
  return adjMatrix
}
