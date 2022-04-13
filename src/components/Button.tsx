import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: auto 0.5rem 1rem 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background: rgba(0, 211, 158, 0.8);
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  color: white;
`;

export default (props: any) => {

  return <Button onClick={() => props.handleOnClick()}>{props.children}</Button>;
};
