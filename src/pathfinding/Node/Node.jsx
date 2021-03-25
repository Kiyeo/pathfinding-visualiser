import React from "react";
import "./Node.css";

export default function Node(props) {
  const { row, col, isStart, isFinish } = props;
  const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : "";
  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  );
}
