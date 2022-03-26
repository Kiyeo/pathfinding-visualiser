import React from "react";
import styled from "styled-components";

const Node = styled.div`
  background-color: rgb(175, 216, 248);
  color: ${(p) => p.theme.backgroundColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props: any) => {
  return <Node >{props.children}</Node>;
};
