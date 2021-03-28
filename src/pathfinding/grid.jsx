import React, { useState, useEffect, useRef } from "react";
import Node from "./Node/Node.jsx";
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from "../algorithms/dijkstra.js";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default function Grid() {
  const [grid, setGrid] = useState([]);
  const nodeRefArray = useRef([]);

  useEffect(() => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-visited";
        //document.getElementById(`node-${node.row}-${node.col}`).className =
        //  "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-shortest-path";
        //document.getElementById(`node-${node.row}-${node.col}`).className =
        //  "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualiseDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodeOrder, nodesInShortestPathOrder);
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
    };
  };

  return (
    <>
      <button onClick={() => visualiseDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const { row, col, isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeId}
                    ref={(el) => (nodeRefArray.current[`${row}-${col}`] = el)}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
