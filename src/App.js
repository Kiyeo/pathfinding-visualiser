import React, { useState, useLayoutEffect, useCallback, useRef } from "react";
import Node from "./components/Node.jsx";
import Button from "./components/Button.jsx";
import {
  getNodesInShortestPathOrder,
  dijkstra,
} from "./algorithms/dijkstra.js";
import "./App.css";

let NUM_ROWS;

const SMALL_NUM_ROWS = 10;
let NUM_COLUMNS;
let NODE_REM;

let START_NODE_ROW;
let START_NODE_COL;
let FINISH_NODE_ROW;
let FINISH_NODE_COL;

const App = () => {
  const startNode = useRef();
  const finishNode = useRef();

  const getInitialGrid = useCallback(() => {
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
  }, []);

  const createNode = (
    row,
    col,
    isWall = false,
    cumulativeWeight = null,
    startNode = { row: START_NODE_ROW, col: START_NODE_COL },
    finishNode = { row: FINISH_NODE_ROW, col: FINISH_NODE_COL }
  ) => {
    return {
      row,
      col,
      isWall: isWall,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === finishNode.row && col === finishNode.col,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
      displayWeight: cumulativeWeight,
      cumulativeWeight,
      isShowCumulativeWeight: false,
    };
  };

  const [grid, setGrid] = useState(() => getInitialGrid());
  const [isVisualising, setIsVisualising] = useState(false);
  const [isPostVisualise, setIsPostVisualise] = useState(false);
  const visitedNodeOrder = useRef([]);
  const nodeRefArray = useRef([]);
  const isResetting = useRef(false);
  const isGenerateWeights = useRef(false);
  const timeOut = useRef([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isNewStartNode, setIsNewStartNode] = useState(false);
  const [isNewFinishNode, setIsNewFinishNode] = useState(false);
  const toggleWeightHistory = useRef([]);
  const isToggle = useRef(false);
  const recoverToggle = useRef(false);

  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(() => {
        if (window.innerHeight > 480) {
          NUM_ROWS = Math.floor(window.innerHeight * 0.003) * 10;
        } else {
          NUM_ROWS = SMALL_NUM_ROWS;
        }
        NUM_COLUMNS = Math.floor(window.innerWidth * 0.003) * 10;
        NODE_REM = 2;

        START_NODE_ROW = Math.floor(NUM_ROWS * 0.5);
        START_NODE_COL = Math.floor(NUM_COLUMNS * 0.25);
        FINISH_NODE_ROW = Math.floor(NUM_ROWS * 0.5);
        FINISH_NODE_COL = Math.floor(NUM_COLUMNS * 0.75);

        setGrid(getInitialGrid());
      }, 500);
    }
    window.addEventListener("resize", () => {
      if (window.innerHeight > 480) updateSize();
    });
    updateSize();
    return () =>
      window.removeEventListener("resize", () => {
        if (window.innerHeight > 480) updateSize();
      });
  }, [getInitialGrid]);

  const handlePointerDownForNode = (row, col) => {
    setIsMousePressed(true);
    const isStartRef =
      row === startNode.current.row && col === startNode.current.col;

    const isFinishRef =
      row === finishNode.current.row && col === finishNode.current.col;

    const isNotVisualisation = !isVisualising && !isPostVisualise;

    if (isStartRef && isNotVisualisation) {
      setIsNewStartNode(true);
    } else if (isFinishRef && isNotVisualisation) {
      setIsNewFinishNode(true);
    } else if (isNotVisualisation) setWall(grid, row, col);
  };

  const handlePointerEnterForNode = (row, col) => {
    if (!isMousePressed && !isVisualising) return;

    const isStartRef =
      row === startNode.current.row && col === startNode.current.col;

    const isFinishRef =
      row === finishNode.current.row && col === finishNode.current.col;

    const isNotStartFinishRef = !isStartRef && !isFinishRef;

    if (isNewStartNode && isNotStartFinishRef) {
      setNewStartOrFinishNode(grid, row, col);
    } else if (isNewFinishNode && isNotStartFinishRef) {
      setNewStartOrFinishNode(grid, row, col);
    } else if (!isVisualising && !isPostVisualise && isNotStartFinishRef)
      setWall(grid, row, col);
  };

  // stops touch move from setting the same element multiple times
  const [touchElement, setTouchElement] = useState(null);

  const handlePointerMoveForNode = (e, isMouse) => {
    const x = isMouse ? e.clientX : e.touches[0].clientX;
    const y = isMouse ? e.clientY : e.touches[0].clientY;

    const element = document.elementFromPoint(x, y);
    const rowAndCol = element.id.split("-");

    const row = Number(rowAndCol[0]);
    const col = Number(rowAndCol[1]);

    if (element.classList.contains("node") && touchElement !== element) {
      setTouchElement(element);
      handlePointerEnterForNode(row, col);
    }
    return;
  };

  const handlePointerUpForNode = () => {
    setIsMousePressed(false);
    setIsNewStartNode(false);
    setIsNewFinishNode(false);
  };

  const handlePointerUpForGrid = () => {
    handlePointerUpForNode();
  };

  const handleMouseLeaveForGrid = () => {
    window.addEventListener("mouseup", () => handlePointerUpForNode());
  };

  const setWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const prevNodeValues = newGrid[row][col];
    const wallNode = {
      ...prevNodeValues,
      displayWeight: prevNodeValues.displayWeight,
      isShowWeight: false,
      isWall: !prevNodeValues.isWall,
    };
    newGrid[row][col] = wallNode;
    setGrid(newGrid);
  };

  const setNewStartOrFinishNode = (grid, row, col) => {
    const newGrid = grid.slice();
    // keep the new start or finish nodes previous (json) values
    const prevNodeValues = newGrid[row][col];
    const currentStartFinishNode = isNewStartNode
      ? startNode.current
      : finishNode.current;
    // only change the type of the start or finish node
    const type = isNewStartNode ? "isStart" : "isFinish";
    const newStartFinishNode = {
      ...prevNodeValues,
      isWall: prevNodeValues.isWall,
      [type]: true,
    };
    const prevStartFinishNodeValues =
      newGrid[currentStartFinishNode.row][currentStartFinishNode.col];
    // change the old start or finish node type to false
    const prevStartFinishNode = {
      ...prevStartFinishNodeValues,
      displayWeight:
        prevStartFinishNodeValues.displayWeight === null &&
        isGenerateWeights.current &&
        !prevStartFinishNodeValues.isWall
          ? Math.ceil(Math.random() * 10)
          : prevStartFinishNodeValues.displayWeight,
      [type]: false,
    };
    newGrid[row][col] = newStartFinishNode;
    newGrid[currentStartFinishNode.row][
      currentStartFinishNode.col
    ] = prevStartFinishNode;
    // update start or finish node reference
    if (isNewStartNode) {
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
          if (isGenerateWeights.current)
            nodeRef.innerText = `${node.cumulativeWeight}`;
          nodeRef.className = "node node-visited";
        }, 5 * i)
      );
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    let delay = 0;
    if (nodesInShortestPathOrder[0].isStart) {
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
    } else {
      const startNodeRow = startNode.current.row;
      const startNodeCol = startNode.current.col;
      nodeRefArray.current[`${startNodeRow}-${startNodeCol}`].className =
        "node node-start";
    }
    timeOut.current.push(
      setTimeout(() => {
        setIsVisualising(false);
        setIsPostVisualise(true);
      }, 55 * delay)
    );
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
      isGenerateWeights.current
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(nodeFinish);
    animateDijkstra(visitedNodeOrder.current, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    isGenerateWeights.current = false;
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
    toggleWeightHistory.current = [];
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
        if ((isVisualising || isPostVisualise) && isGenerateWeights.current) {
          nodeRef.innerText = `${node.displayWeight}`;
        } else {
          nodeRef.innerText = "";
        }
        nodeRef.className = "node";
      }
    }
  };

  const restoreGrid = (isRestore = true) => {
    timeOut.current.forEach((timer) => {
      clearTimeout(timer);
    });
    setIsVisualising(false);
    setIsMousePressed(false);
    setIsPostVisualise(false);
    resetVisitedNodeCSS();
    perserveGrid(grid, isRestore);
  };

  const perserveGrid = (grid, isRestore) => {
    const newGrid = [];
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
              false,
              null,
              { row: startNodeRow, col: startNodeCol },
              { row: finishNodeRow, col: finishNodeCol }
            )
          );
          nodeRef.innerText = "";
          nodeRef.className = "node node-start";
        } else if (row === finishNodeRow && col === finishNodeCol) {
          currentRow.push(
            createNode(
              finishNodeRow,
              finishNodeCol,
              false,
              null,
              { row: startNodeRow, col: startNodeCol },
              { row: finishNodeRow, col: finishNodeCol }
            )
          );
          nodeRef.innerText = "";
          nodeRef.className = "node node-finish";
        } else {
          if (!recoverToggle.current) {
            const currNode = grid[row][col];
            currentRow.push(
              createNode(
                row,
                col,
                currNode.isWall,
                isToggle.current
                  ? null
                  : isRestore
                  ? currNode.displayWeight
                  : Math.random() > 0.5
                  ? Math.ceil(Math.random() * 10)
                  : 1,
                { row: startNodeRow, col: startNodeCol },
                { row: finishNodeRow, col: finishNodeCol }
              )
            );
            nodeRef.className = currNode.isWall ? "node node-wall" : "node";
          } else {
            const currNode = toggleWeightHistory.current[row][col];
            currentRow.push(
              createNode(
                row,
                col,
                grid[row][col].isWall,
                currNode.displayWeight,
                { row: startNodeRow, col: startNodeCol },
                { row: finishNodeRow, col: finishNodeCol }
              )
            );
            nodeRef.className = grid[row][col].isWall
              ? "node node-wall"
              : "node";
          }
        }
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    return newGrid;
  };

  const generateWeights = (grid, isToggleWeightBool, isRestore = false) => {
    isGenerateWeights.current = isToggleWeightBool;
    isToggle.current = false;
    const newGrid = perserveGrid(grid, isRestore);
    if (isGenerateWeights.current) {
      toggleWeightHistory.current = newGrid;
    }
  };

  const toggleWeights = () => {
    isGenerateWeights.current = !isGenerateWeights.current;
    isToggle.current = !isToggle.current;
    if (isToggle.current) {
      perserveGrid(grid, false);
    } else {
      recoverToggle.current = true;
      perserveGrid(grid, false);
      recoverToggle.current = false;
    }
  };

  return (
    <>
      <div
        className="galaxy-fold-open-your-device"
        style={{ display: "none" }}
      ></div>
      <div className="App">
        <div
          className="button-container"
          style={{
            textAlign: "center",
            margin: "2rem auto",
          }}
        >
          <Button type={"reset"} handleFunction={() => resetGrid()}></Button>
          <Button
            type={"restore"}
            handleFunction={() => restoreGrid(grid)}
            disable={!(isVisualising || isPostVisualise)}
            disabledTitle={"Restores state before the visualisation"}
          ></Button>
          <Button
            type={"toggle-weights"}
            handleFunction={() => toggleWeights()}
            disable={
              !toggleWeightHistory.current.length ||
              isVisualising ||
              isPostVisualise
            }
          ></Button>
          <Button
            type={"generate-weights"}
            handleFunction={() => generateWeights(grid, true)}
            disable={isVisualising || isPostVisualise}
            title={"Generates random weights to each node. Click to toggle."}
            disabledTitle={"Can only reassign random weights on restore"}
          ></Button>
          <Button
            type={"visualise"}
            handleFunction={() => visualiseDijkstra()}
            disable={isVisualising}
            isVisualising={isVisualising}
            isPostVisualise={isPostVisualise}
          ></Button>
        </div>
        <div
          className="grid"
          onPointerUp={() => handlePointerUpForGrid()}
          onMouseLeave={() => handleMouseLeaveForGrid()}
          title={
            isPostVisualise
              ? "Click 'Restore' to adjust start, finish and wall nodes"
              : undefined
          }
          style={{
            margin: "auto",
            display: "grid",

            gridTemplateColumns: `repeat(${NUM_COLUMNS}, ${NODE_REM}rem)`,
            gridTemplateRows: `repeat(${NUM_ROWS}, ${NODE_REM}rem)`,
            gap: "1px",
            //makes the grid width relative to sum of all node pixels
            // 1px === 0.06rem. NUM_COLUMNS * 0.06 is to account for the gap of 1px
            width: `${
              NUM_COLUMNS * NODE_REM + (NUM_COLUMNS + NUM_ROWS) * 0.06
            }rem`,
            touchAction: "none",
            fontFamily: "Alcubierre",
            fontSize: "1rem",
            color: "black",
            cursor: isVisualising ? "progress" : "pointer",
          }}
        >
          {grid.map((row) =>
            row.map((node) => {
              const {
                row,
                col,
                isWall,
                isStart,
                isFinish,
                isVisited,
                displayWeight,
                cumulativeWeight,
                isShowCumulativeWeight: isShowWeight,
              } = node;
              return (
                <Node
                  key={`${row}-${col}`}
                  ref={(el) => (nodeRefArray.current[`${row}-${col}`] = el)}
                  handlePointerDownForNode={(row, col) =>
                    handlePointerDownForNode(row, col)
                  }
                  handlePointerEnterForNode={(row, col) =>
                    handlePointerEnterForNode(row, col)
                  }
                  handleTouchMoveForNode={(e) =>
                    handlePointerMoveForNode(e, false)
                  }
                  handlePointerUpForNode={() => handlePointerUpForNode()}
                  row={row}
                  col={col}
                  isWall={isWall}
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
    </>
  );
};

export default App;
