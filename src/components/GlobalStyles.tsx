import { createGlobalStyle } from "styled-components";
import Theme from "../theme";

export default createGlobalStyle<{ theme: Theme }>`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: montserrat;
      background-color: ${(p) => p.theme.backgroundColor};
      color: ${(p) => p.theme.color};
      transition: background-color 1s ease-in, color 1s ease-in;
  }

  h1, h2, h3 {
    font-family: quicksand;
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

img, picture {
  max-width: 100%;
}


  code {
    font-family: JetBrain Mono;
  }
`;
