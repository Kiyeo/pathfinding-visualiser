import React, { useState, useEffect, useRef } from "react";
import Node from "./components/Node.jsx";
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from "./algorithms/dijkstra.js";
import "./App.css";

const NUM_ROWS = 20;
const NUM_COLUMNS = 50;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 5;
const FINISH_NODE_COL = 35;

const App = () => {
  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
    };
  };

  const [grid, setGrid] = useState(() => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  });

  const [isVisualising, setIsVisualising] = useState(false);
  const visitedNodeOrder = useRef([]);
  const nodeRefArray = useRef([]);

  useEffect(() => {}, []);

  const animateDijkstra = (visitedNodeOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodeOrder.length; i++) {
      if (i === visitedNodeOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodeOrder[i];
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-visited";
      }, 5 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-shortest-path";
      }, 50 * i);
    }
    setTimeout(() => setIsVisualising(false), 1250);
  };

  const visualiseDijkstra = () => {
    // disable if already visualising the algorithm
    resetGrid();
    setIsVisualising(true);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedNodeOrder.current = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodeOrder.current, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    setIsVisualising(false);
    for (let i = 0; i < visitedNodeOrder.current.length; i++) {
      const node = visitedNodeOrder.current[i];
      if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-start";
      } else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-finish";
      } else {
        nodeRefArray.current[`${node.row}-${node.col}`].className = "node";
      }
    }
  };

  return (
    <div className="App">
      <button disabled={isVisualising} onClick={() => resetGrid()}>
        Reset
      </button>
      <button disabled={isVisualising} onClick={() => visualiseDijkstra()}>
        Visualise Dijkstra's Algorithm
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
    </div>
  );
};

export default App;
