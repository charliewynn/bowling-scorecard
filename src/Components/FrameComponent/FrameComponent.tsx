import React, { FC } from "react";
import Frame, { FrameScoreType } from "../../Models/Frame/Frame";
import "./FrameComponent.css";

export const FrameComponent: FC<{ frame: Frame; onClick: Function }> = ({
  frame,
  onClick,
}) => {
  const secondBallValue = () => {
    if (frame.scoreType === FrameScoreType.none) {
      return frame.ball2Score;
    } else if (frame.scoreType === FrameScoreType.spare) {
      return "/";
    }
  };
  const renderScores = () => {
    if (frame.scoreType === FrameScoreType.strike) {
      return <div className="score">X</div>;
    }
    return (
      <>
        <div className="score">{frame.ball1Score}</div>
        <div className="score">{secondBallValue()}</div>
      </>
    );
  };
  return (
    <div onClick={() => onClick()} className="frame">
      {renderScores()}
    </div>
  );
};
