import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import ButtonGroup from "./components/ButtonGroup";
import GlobalStyles from "./components/GlobalStyles";
import Grid from "./components/Grid";
import Theme from "./@types/theme";
import { GridContext } from "./contexts/GridContext";
import IGridDimensions from "./@types/gridDimensions";
import IVertex from "./@types/vertex";
import VertexType from "./VertexType";
import Graph from "./components/Graph";
import useGraph from "./hooks/useGraph";
import { GraphContext } from "./contexts/GraphContext";
import { GraphContextType } from "./@types/graphContextType";

//const rustAlgorithms = async (grid: IVertex[][], source: IVertex): Promise<void> => {
//  const algorithms = await import("algorithms");
//  console.log(algorithms.dijkstra(grid, source));
//}
let NUM_ROWS: number;
const SMALL_NUM_ROWS = 10;
let NUM_COLUMNS: number;

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


  const getInitialGraph = useCallback(() =>
    useGraph(4) as GraphContextType
    , []);
  //rustAlgorithms(grid, startVertex.current)

  // useLayoutEffect(() => {
  //   function updateSize() {
  //     setTimeout(() => {
  //       if (window.innerHeight > 500) {
  //         NUM_ROWS = Math.floor(window.innerHeight * 0.003) * 10;
  //         if (NUM_ROWS === 10) NUM_ROWS = NUM_ROWS + 5;
  //       } else {
  //         NUM_ROWS = SMALL_NUM_ROWS;
  //       }
  //       NUM_COLUMNS = Math.floor(window.innerWidth * 0.003) * 10;
  //       console.log(NUM_ROWS, NUM_COLUMNS)
  //     }, 500);
  //   }
  //   window.addEventListener("resize", () => {
  //     if (window.innerHeight > 480) updateSize();
  //   });
  //   updateSize();
  //   return () =>
  //     window.removeEventListener("resize", () => {
  //       if (window.innerHeight > 480) updateSize();
  //     });
  // }, [getInitialGraph]);

  const graph = getInitialGraph()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {
        //<GridContext.Provider value={{ grid, setGrid, gridDimensions, startNode: startVertex, finishNode: finishVertex }}>
        //  <ButtonGroup />
        //  <Grid />
        //</GridContext.Provider>

      }
      <GraphContext.Provider value={graph}>
        <Graph />
      </GraphContext.Provider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />,);
