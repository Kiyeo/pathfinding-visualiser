import React from "react";
import "./Button.css";

export default function Button(props) {
  const { type, handleFunction, disable, title, disabledTitle } = props;
  const displayText = type
    .replace("-", " ")
    .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
  const displayTitle =
    type === "restore" && disable
      ? disabledTitle
      : type === "random-weights" && !disable
      ? title
      : type === "random-weights" && disable
      ? disabledTitle
      : "";

  return (
    <button
      shape={"round"}
      title={displayTitle}
      className={type}
      disabled={disable}
      onClick={() => handleFunction()}
    >
      {displayText}
    </button>
  );
}
