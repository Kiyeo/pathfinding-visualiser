import React from "react";
import styled from "styled-components";
import NodeType from "../NodeType"

const Node = styled.div<{ nodeType: number }>`
  touch-action: none;
  user-select: none;
  background-color: ${(p) => p.nodeType === NodeType.start && 'green' || p.nodeType === NodeType.finish && 'red' || 'rgb(175, 216, 248)'};
  color: ${(p) => p.theme.backgroundColor};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props: any) => {
  const { node, handleMouseEvent } = props;
  return <Node
    id={`${node.row} ${node.col}`}
    onPointerDown={(e) => handleMouseEvent(e)}
    onPointerUp={(e) => handleMouseEvent(e)}
    onMouseEnter={(e) => handleMouseEvent(e)}
    onTouchMove={(e) => handleMouseEvent(e)}
    onDragStart={(e) => {
      // Block drag default event
      e.preventDefault();
      e.stopPropagation();
    }}
    nodeType={node.nodeType} >{node.weight}</Node>;
};
