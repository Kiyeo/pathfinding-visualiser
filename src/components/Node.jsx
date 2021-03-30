import React, { forwardRef } from "react";
import "./Node.css";

export default forwardRef((props, ref) => {
  const {
    row,
    col,
    isStart,
    isFinish,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = props;
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";

  return (
    <div
      onMouseDown={() => {
        handleMouseDown(row, col);
      }}
      onMouseEnter={() => {
        handleMouseEnter(row, col);
      }}
      onMouseUp={() => {
        handleMouseUp();
      }}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      ref={ref}
      className={`node ${extraClassName}`}
    ></div>
  );
});
