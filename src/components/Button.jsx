import React from "react";
import "./Button.css";

export default function Button(props) {
  const {
    type,
    handleFunction,
    disable,
    title,
    disabledTitle,
    isVisualising,
    isPostVisualise,
  } = props;
  const text = type
    .replace("-", " ")
    .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
  const displayText =
    type === "visualise" && isPostVisualise && !isVisualising
      ? "Revisualise"
      : type === "visualise" && isVisualising
      ? "Visualising"
      : text;
  const displayTitle =
    type === "restore" && disable
      ? disabledTitle
      : type === "random-weights" && !disable
      ? title
      : type === "random-weights" && disable
      ? disabledTitle
      : "";
  const className = isVisualising
    ? `${type} visualising loading`
    : isPostVisualise
    ? `${type} notify`
    : type;

  return (
    <button
      shape={"round"}
      title={displayTitle}
      className={className}
      disabled={disable}
      onClick={() => handleFunction()}
    >
      {isVisualising && <i className={"spinner"} />}
      {displayText}
    </button>
  );
}
