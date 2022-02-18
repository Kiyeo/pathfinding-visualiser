import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import Theme from "./theme";

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
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
