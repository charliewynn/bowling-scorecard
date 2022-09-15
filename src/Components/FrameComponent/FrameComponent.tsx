import React, { FC, useEffect, useState } from "react";
import Frame, { FrameScoreType } from "../../Models/Frame/Frame";
import "./FrameComponent.css";

export const FrameComponent: FC<{ frame: Frame; onClick: Function }> = ({
  frame,
  onClick,
}) => {
  const [currFrame, setCurrFrame] = useState(frame);
  useEffect(() => {
    console.log("Got new data");
    setCurrFrame(frame);
  }, [frame]);
  const secondBallValue = () => {
    if (currFrame.scoreType === FrameScoreType.none) {
      return currFrame.ball2Score;
    } else if (currFrame.scoreType === FrameScoreType.spare) {
      return "/";
    }
  };
  const renderScores = () => {
    if (currFrame.scoreType === FrameScoreType.strike) {
      return <div className="score">X</div>;
    }
    return (
      <>
        <div className="score">{currFrame.ball1Score}</div>
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
