import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import ButtonGroup from "./components/ButtonGroup";
import GlobalStyles from "./components/GlobalStyles";
import Grid from "./components/Grid";
import Theme from "./theme";
import { GridContext } from "./contexts/GridContext";
import GridDimensions from "./griddimensions";
import NodeType from "./node";

import("algorithms").then((m) => {
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

    //m.greet("leo");

    const [theme, setTheme] = useState(darkTheme);
    const gridDimensions: GridDimensions = {
      rows: 25,
      columns: 50,
    };
    const [grid, setGrid] = useState<NodeType[][]>(() =>
      Array.from({ length: gridDimensions.rows }).map(() =>
        Array.from({ length: gridDimensions.columns }, () =>
        (
          {
            weight: Math.ceil(Math.random() * 10),
            isStart: false,
            isFinish: false,
          }
        )))
    );
    const [gridHistory, setGridHistory] = useState(grid);


    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GridContext.Provider value={{ grid, setGrid, gridDimensions }}>
          <ButtonGroup />
          <Grid />
        </GridContext.Provider>
      </ThemeProvider>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
});
