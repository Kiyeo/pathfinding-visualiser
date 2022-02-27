import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Grid from "./components/Grid";
import Theme from "./theme";

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
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Grid />
      </ThemeProvider>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
});
