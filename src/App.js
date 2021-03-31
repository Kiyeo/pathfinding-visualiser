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
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const App = () => {
  const startNode = useRef();
  const finishNode = useRef();

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLUMNS; col++) {
        currentRow.push(createNode(row, col));
        if (row === START_NODE_ROW && col === START_NODE_COL)
          startNode.current = { row, col };
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
          finishNode.current = { row, col };
      }
      grid.push(currentRow);
    }
    return grid;
  };

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

  const [grid, setGrid] = useState(() => getInitialGrid());
  const [isVisualising, setIsVisualising] = useState(false);
  const visitedNodeOrder = useRef([]);
  const nodeRefArray = useRef([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isNewStartNode, setIsNewStartNode] = useState(false);
  const [isNewFinishNode, setIsNewFinishNode] = useState(false);
  const [isPostVisualise, setIsPostVisualise] = useState(false);

  useEffect(() => {}, []);

  const handleMouseDown = (row, col) => {
    setIsMousePressed(true);
    if (
      row === startNode.current.row &&
      col === startNode.current.col &&
      !isVisualising &&
      !isPostVisualise
    ) {
      setIsNewStartNode(true);
    }
    if (
      row === finishNode.current.row &&
      col === finishNode.current.col &&
      !isVisualising &&
      !isPostVisualise
    ) {
      setIsNewFinishNode(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed && !isVisualising) return;
    if (
      isNewStartNode &&
      !(row === finishNode.current.row && col === finishNode.current.col)
    ) {
      const newGrid = setNewStartOrFinishNode(grid, row, col);
      setGrid(newGrid);
    }
    if (
      isNewFinishNode &&
      !(row === startNode.current.row && col === startNode.current.col)
    ) {
      const newGrid = setNewStartOrFinishNode(grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
    setIsNewStartNode(false);
    setIsNewFinishNode(false);
  };

  const handleMouseLeave = () => {
    setIsMousePressed(false);
    setIsNewStartNode(false);
    setIsNewFinishNode(false);
  };

  const setNewStartOrFinishNode = (grid, row, col) => {
    const newGrid = grid.slice();
    const prevNode = newGrid[row][col];
    const currentStartFinishNode = isNewStartNode
      ? startNode.current
      : finishNode.current;
    const type = isNewStartNode ? "isStart" : "isFinish";
    const newStartFinishNode = {
      ...prevNode,
      [type]: true,
    };
    const prevStartFinishNode =
      newGrid[currentStartFinishNode.row][currentStartFinishNode.col];
    const rmPrevStartNode = {
      ...prevStartFinishNode,
      [type]: false,
    };
    newGrid[row][col] = newStartFinishNode;
    newGrid[currentStartFinishNode.row][
      currentStartFinishNode.col
    ] = rmPrevStartNode;
    if (isNewStartNode) {
      startNode.current = { row, col };
    } else {
      finishNode.current = { row, col };
    }
    return newGrid;
  };

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
    let delay = 0;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      delay = i;
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-shortest-path";
      }, 50 * i);
    }
    setTimeout(() => setIsVisualising(false), 50 * delay);
    setIsPostVisualise(true);
  };

  const visualiseDijkstra = () => {
    // disable if already visualising the algorithm
    //resetGrid();
    if (isPostVisualise) resetVisitedNodeCSS();
    setIsVisualising(true);
    const nodeStart = grid[startNode.current.row][startNode.current.col];
    const nodeFinish = grid[finishNode.current.row][finishNode.current.col];
    visitedNodeOrder.current = dijkstra(grid, nodeStart, nodeFinish);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(nodeFinish);
    animateDijkstra(visitedNodeOrder.current, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    setIsVisualising(false);
    setIsMousePressed(false);
    setIsPostVisualise(false);
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
    resetVisitedNodeCSS();
  };

  const resetVisitedNodeCSS = () => {
    const nodeStart = isPostVisualise
      ? startNode.current
      : { row: START_NODE_ROW, col: START_NODE_COL };
    const nodeFinish = isPostVisualise
      ? finishNode.current
      : { row: FINISH_NODE_ROW, col: FINISH_NODE_COL };
    for (let i = 0; i < visitedNodeOrder.current.length; i++) {
      const node = visitedNodeOrder.current[i];
      if (node.row === nodeStart.row && node.col === nodeStart.col) {
        nodeRefArray.current[`${node.row}-${node.col}`].className =
          "node node-start";
      } else if (node.row === nodeFinish.row && node.col === nodeFinish.col) {
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
      <div
        className="grid"
        onMouseLeave={() => handleMouseLeave()}
        style={{
          margin: "100px auto",
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLUMNS}, 25px)`,
          //makes the grid width relative to node dimension
          width: `${NUM_COLUMNS * 25}px`,
        }}
      >
        {grid.map((row) =>
          row.map((node) => {
            const { row, col, isStart, isFinish, isVisited } = node;
            return (
              <Node
                key={`${row}-${col}`}
                ref={(el) => (nodeRefArray.current[`${row}-${col}`] = el)}
                handleMouseDown={(row, col) => handleMouseDown(row, col)}
                handleMouseEnter={(row, col) => handleMouseEnter(row, col)}
                handleMouseUp={() => handleMouseUp()}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isVisited={isVisited}
              ></Node>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
