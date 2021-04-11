import React from "react";
import "./InfiniteText.scss";
const InfiniteText = ({ width, ...props }) => {
  return (
    <>
      <p className="marquee">
        <span>
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -&nbsp;
        </span>
      </p>
      <p className="marquee marquee2">
        <span>
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -{" "}
          {props.children} - {props.children} - {props.children} -&nbsp;
        </span>
      </p>
    </>
  );
};

export default InfiniteText;
