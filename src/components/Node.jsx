import React, { forwardRef } from "react";
import "./Node.css";

export default forwardRef((props, ref) => {
  const { row, col, isStart, isFinish } = props;
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";
  return (
    <div
      id={`node-${row}-${col}`}
      ref={ref}
      className={`node ${extraClassName}`}
    ></div>
  );
});
