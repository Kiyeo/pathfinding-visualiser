import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import ButtonGroup from "./components/ButtonGroup";
import GlobalStyles from "./components/GlobalStyles";
import Grid from "./components/Grid";
import Theme from "./@types/theme";
import { GridContext } from "./contexts/GridContext";
import IGridDimensions from "./@types/gridDimensions";
import INode from "./@types/node";
import NodeType from "./NodeType";

const rustAlgorithms = async (grid: INode[][], source: INode): Promise<void> => {
  const algorithms = await import("algorithms");
  console.log(algorithms.dijkstra(grid, source));
}

const App = () => {
  const lightTheme: Theme = {
    backgroundColor: "hsl(0, 0%, 95%)",
    color: "#121212",
    accent: "#f8bf54f8",
    hoverAccent: "hsl(0, 0%, 85%)",
  };

  const darkTheme: Theme = {
    backgroundColor: "#121212",
    color: "white",
    accent: "orange",
    hoverAccent: "hsl(0, 0%, 45%)",
  };

  const [theme, setTheme] = useState(darkTheme);
  const gridDimensions: IGridDimensions = {
    rows: 25,
    columns: 50,
  };

  const startNode = useRef<INode>(
    {
      weight: Math.ceil(Math.random() * 10),
      nodeType: NodeType.start,
      row: Math.floor(gridDimensions.rows * 0.5),
      col: Math.floor(gridDimensions.columns * 0.25) - 1,
      prevNode: null
    }
  )

  const finishNode = useRef<INode>(
    {
      weight: Math.ceil(Math.random() * 10),
      nodeType: NodeType.finish,
      row: Math.floor(gridDimensions.rows * 0.5),
      col: Math.floor(gridDimensions.columns * 0.75) - 1,
      prevNode: null
    }
  )

  const [grid, setGrid] = useState<INode[][]>((): INode[][] => {
    let initialGrid = Array.from({ length: gridDimensions.rows }).map((_, row) =>
      Array.from({ length: gridDimensions.columns }, (_, col): INode => ({
        weight: Math.ceil(Math.random() * 10),
        nodeType: NodeType.normal,
        row: row,
        col: col,
        prevNode: null
      })
      ))
    initialGrid[startNode.current.row][startNode.current.col] = startNode.current
    initialGrid[finishNode.current.row][finishNode.current.col] = finishNode.current
    return initialGrid
  }
  );
  const [gridHistory, setGridHistory] = useState(grid);

  rustAlgorithms(grid, startNode.current!)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GridContext.Provider value={{ grid, setGrid, gridDimensions, startNode, finishNode }}>
        <ButtonGroup />
        <Grid />
      </GridContext.Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
