import React, { forwardRef } from "react";
import "./Node.css";
import "../index.css";

export default forwardRef((props, ref) => {
  const {
    row,
    col,
    isWall,
    isStart,
    isFinish,
    handleMouseDownForNode,
    handleMouseEnterForNode,
    handleTouchMoveForNode,
    handleMouseUpForNode,
    displayWeight,
    isShowWeight,
  } = props;
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`${row}-${col}`}
      onPointerDown={() => handleMouseDownForNode(row, col)}
      onPointerEnter={() => handleMouseEnterForNode(row, col)}
      //onTouchMove={(e) => {
      //  handleTouchMoveForNode(e);
      //}}
      onPointerUp={() => handleMouseUpForNode()}
      onDragStart={(e) => {
        // Block drag default event
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={ref}
      className={`node ${extraClassName}`}
    >
      {isStart
        ? ""
        : isFinish
        ? ""
        : displayWeight === Infinity
        ? ""
        : isShowWeight && !isWall
        ? ""
        : displayWeight}
    </div>
  );
});
