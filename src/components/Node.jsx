import React, { forwardRef } from "react";
import "./Node.css";

export default forwardRef((props, ref) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    handleMouseDownForNode,
    handleMouseEnterForNode,
    handleMouseUpForNode,
    displayWeight,
    isShowWeight,
  } = props;
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";

  return (
    <div
      id={`${row}-${col}`}
      onMouseDown={() => {
        handleMouseDownForNode(row, col);
      }}
      onMouseEnter={() => {
        handleMouseEnterForNode(row, col);
      }}
      onMouseUp={() => {
        handleMouseUpForNode();
      }}
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
        : isShowWeight
        ? ""
        : displayWeight}
    </div>
  );
});
