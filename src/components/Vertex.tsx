import React from "react";
import styled from "styled-components";
import VertexType from "../VertexType"

const Vertex = styled.div<{ nodeType: number }>`
  touch-action: none;
  user-select: none;
  background-color: ${(p) => p.nodeType === VertexType.start && 'green' || p.nodeType === VertexType.finish && 'red' || 'rgb(175, 216, 248)'};
  color: ${(p) => p.theme.backgroundColor};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props: any) => {
  const { id, vertex, handleMouseEvent } = props;
  return <Vertex
    id={`${id.rowIdx} ${id.colIdx}`}
    onPointerDown={() => handleMouseEvent()}
    onPointerUp={() => handleMouseEvent()}
    onMouseEnter={() => handleMouseEvent()}
    onTouchMove={() => handleMouseEvent()}
    onDragStart={(e) => {
      // Block drag default event
      e.preventDefault();
      e.stopPropagation();
    }}
    nodeType={vertex.nodeType} >{vertex.name}</Vertex>;
};
