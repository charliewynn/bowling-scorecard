import React from "react";
import Frame from "../Models/Frame/Frame";
import "./FrameComponent.css";
type FrameProps = {
  frame: Frame;
};

export const FrameComponent = ({ frame }: FrameProps) => {
  const secondBallValue = () => {
    if (frame.scoreType === "none") {
      return frame.ball2Score;
    } else if (frame.scoreType === "spare") {
      return "/";
    }
  };
  const renderScores = () => {
    if (frame.scoreType === "strike") {
      return <div className="score">X</div>;
    }
    return (
      <>
        <div className="score">{frame.ball1Score}</div>
        <div className="score">{secondBallValue()}</div>
      </>
    );
  };
  return <div className="frame">{renderScores()}</div>;
};
