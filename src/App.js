import React, { useState, useEffect, useRef } from "react";
import Node from "./components/Node.jsx";
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from "./algorithms/dijkstra.js";
import "./App.css";

const NUM_ROWS = 20;
const NUM_COLUMNS = 50;
const NODE_PIXEL = 25;

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

  const createNode = (
    row,
    col,
    cumulativeWeight = null,
    startNode = { row: START_NODE_ROW, col: START_NODE_COL },
    finishNode = { row: FINISH_NODE_ROW, col: FINISH_NODE_COL }
  ) => {
    return {
      row,
      col,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
      displayWeight: cumulativeWeight,
      cumulativeWeight,
      isShowWeight: false,
    };
  };

  const [grid, setGrid] = useState(() => getInitialGrid());
  const [isVisualising, setIsVisualising] = useState(false);
  const [isPostVisualise, setIsPostVisualise] = useState(false);
  const visitedNodeOrder = useRef([]);
  const nodeRefArray = useRef([]);
  const isResetting = useRef(false);
  const isRandomWeights = useRef(false);
  const timeOut = useRef([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isStartFinishNode, setIsNewStartNode] = useState(false);
  const [isNewFinishNode, setIsNewFinishNode] = useState(false);

  useEffect(() => {}, []);

  const handleMouseDownForNode = (row, col) => {
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

  const handleMouseEnterForNode = (row, col) => {
    if (!isMousePressed && !isVisualising) return;
    if (
      isStartFinishNode &&
      !(row === finishNode.current.row && col === finishNode.current.col)
    ) {
      setNewStartOrFinishNode(grid, row, col);
    }
    if (
      isNewFinishNode &&
      !(row === startNode.current.row && col === startNode.current.col)
    ) {
      setNewStartOrFinishNode(grid, row, col);
    }
  };

  const handleMouseUpForNode = () => {
    setIsMousePressed(false);
    setIsNewStartNode(false);
    setIsNewFinishNode(false);
  };

  const handleMouseLeaveForGrid = () => {
    setIsMousePressed(false);
    setIsNewStartNode(false);
    setIsNewFinishNode(false);
  };

  const setNewStartOrFinishNode = (grid, row, col) => {
    const newGrid = grid.slice();
    // keep the new start or finish nodes previous (json) values
    const prevNodeValues = newGrid[row][col];
    const currentStartFinishNode = isStartFinishNode
      ? startNode.current
      : finishNode.current;
    // only change the type of the start or finish node
    const type = isStartFinishNode ? "isStart" : "isFinish";
    const newStartFinishNode = {
      ...prevNodeValues,
      [type]: true,
    };
    const prevStartFinishNodeValues =
      newGrid[currentStartFinishNode.row][currentStartFinishNode.col];
    // change the old start or finish node type to false
    const prevStartFinishNode = {
      ...prevStartFinishNodeValues,
      [type]: false,
    };
    newGrid[row][col] = newStartFinishNode;
    newGrid[currentStartFinishNode.row][
      currentStartFinishNode.col
    ] = prevStartFinishNode;
    // update start or finish node reference
    if (isStartFinishNode) {
      startNode.current = { row, col };
    } else {
      finishNode.current = { row, col };
    }
    setGrid(newGrid);
  };

  const animateDijkstra = (visitedNodeOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodeOrder.length; i++) {
      if (i === visitedNodeOrder.length) {
        timeOut.current.push(
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
          }, 5 * i)
        );
        return;
      }
      timeOut.current.push(
        setTimeout(() => {
          const node = visitedNodeOrder[i];
          const nodeRef = nodeRefArray.current[`${node.row}-${node.col}`];
          // displays cumulative weight if in random weight simulation
          if (isRandomWeights.current)
            nodeRef.innerText = `${node.cumulativeWeight}`;
          nodeRef.className = "node node-visited";
        }, 5 * i)
      );
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    let delay = 0;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      delay = i;
      timeOut.current.push(
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          nodeRefArray.current[`${node.row}-${node.col}`].className =
            "node node-shortest-path";
        }, 50 * i)
      );
    }
    timeOut.current.push(setTimeout(() => setIsVisualising(false), 50 * delay));
    setIsPostVisualise(true);
  };

  const visualiseDijkstra = () => {
    // resets css when resimulating
    if (isPostVisualise) resetVisitedNodeCSS();
    setIsVisualising(true);
    const nodeStart = grid[startNode.current.row][startNode.current.col];
    const nodeFinish = grid[finishNode.current.row][finishNode.current.col];
    visitedNodeOrder.current = dijkstra(
      grid,
      nodeStart,
      nodeFinish,
      isRandomWeights.current
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(nodeFinish);
    animateDijkstra(visitedNodeOrder.current, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    isRandomWeights.current = false;
    timeOut.current.forEach((timer) => {
      clearTimeout(timer);
    });
    isResetting.current = true;
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
      const nodeRef = nodeRefArray.current[`${node.row}-${node.col}`];
      if (node.row === nodeStart.row && node.col === nodeStart.col) {
        nodeRef.innerText = "";
        nodeRef.className = "node node-start";
      } else if (node.row === nodeFinish.row && node.col === nodeFinish.col) {
        nodeRef.innerText = "";
        nodeRef.className = "node node-finish";
      } else {
        if (isPostVisualise && isRandomWeights.current) {
          nodeRef.innerText = `${node.displayWeight}`;
        } else {
          nodeRef.innerText = "";
        }
        nodeRef.className = "node";
      }
    }
  };

  const randomWeights = () => {
    isRandomWeights.current = true;
    const grid = [];
    const startNodeRow = startNode.current.row;
    const startNodeCol = startNode.current.col;
    const finishNodeRow = finishNode.current.row;
    const finishNodeCol = finishNode.current.col;
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLUMNS; col++) {
        const nodeRef = nodeRefArray.current[`${row}-${col}`];
        if (row === startNodeRow && col === startNodeCol) {
          currentRow.push(
            createNode(
              startNodeRow,
              startNodeCol,
              null,
              { row: startNodeRow, col: startNodeCol },
              { row: finishNodeRow, col: finishNodeCol }
            )
          );
          nodeRef.className = "node node-start";
        } else if (row === finishNodeRow && col === finishNodeCol) {
          currentRow.push(
            createNode(
              finishNodeRow,
              finishNodeCol,
              null,
              { row: startNodeRow, col: startNodeCol },
              { row: finishNodeRow, col: finishNodeCol }
            )
          );
          nodeRef.className = "node node-finish";
        } else {
          currentRow.push(
            createNode(
              row,
              col,
              Math.random() > 0.5 ? Math.ceil(Math.random() * 10) : 1,
              { row: startNodeRow, col: startNodeCol },
              { row: finishNodeRow, col: finishNodeCol }
            )
          );
          nodeRef.className = "node";
        }
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  };

  return (
    <div className="App">
      <button onClick={() => resetGrid()}>Reset</button>
      <button
        disabled={isVisualising || isPostVisualise}
        onClick={() => randomWeights()}
      >
        Random Weights
      </button>
      <button disabled={isVisualising} onClick={() => visualiseDijkstra()}>
        Visualise Dijkstra's Algorithm
      </button>
      <div
        className="grid"
        onMouseLeave={() => handleMouseLeaveForGrid()}
        style={{
          margin: "100px auto",
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLUMNS}, ${NODE_PIXEL}px)`,
          //makes the grid width relative to sum of all node pixels
          width: `${NUM_COLUMNS * NODE_PIXEL}px`,
        }}
      >
        {grid.map((row) =>
          row.map((node) => {
            const {
              row,
              col,
              isStart,
              isFinish,
              isVisited,
              displayWeight,
              cumulativeWeight,
              isShowWeight,
            } = node;
            return (
              <Node
                key={`${row}-${col}`}
                ref={(el) => (nodeRefArray.current[`${row}-${col}`] = el)}
                handleMouseDownForNode={(row, col) =>
                  handleMouseDownForNode(row, col)
                }
                handleMouseEnterForNode={(row, col) =>
                  handleMouseEnterForNode(row, col)
                }
                handleMouseUpForNode={() => handleMouseUpForNode()}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isVisited={isVisited}
                displayWeight={displayWeight}
                cumulativeWeight={cumulativeWeight}
                isShowWeight={isShowWeight}
              ></Node>
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
