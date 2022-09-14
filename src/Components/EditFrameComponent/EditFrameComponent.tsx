import React, { FC, useState } from "react";
import Frame, { FrameScoreType } from "../../Models/Frame/Frame";
import "./EditFrameComponent.css";

export const EditFrameComponent: FC<{ frame: Frame; onSave: Function }> = ({
  frame,
  onSave,
}) => {
  const [frameType, setFrameType] = useState<FrameScoreType>(frame.scoreType);
  const [ball1Score, setBall1Score] = useState<number>(frame.ball1Score);
  const [ball2Score, setBall2Score] = useState<number>(frame.ball2Score);
  const renderFrameTypeOptions = () => {
    return (
      <div className="frame-types">
        <button
          className={frameType === FrameScoreType.none ? "selected" : ""}
          onClick={() => setFrameType(FrameScoreType.none)}
        >
          None
        </button>
        <button
          className={frameType === FrameScoreType.spare ? "selected" : ""}
          onClick={() => setFrameType(FrameScoreType.spare)}
        >
          Spare
        </button>
        <button
          className={frameType === FrameScoreType.strike ? "selected" : ""}
          onClick={() => setFrameType(FrameScoreType.strike)}
        >
          Strike
        </button>
      </div>
    );
  };
  return (
    <div className="edit-frame-component">
      {renderFrameTypeOptions()}
      <div className="score">{frame.ball1Score}</div>
      <button onClick={() => onSave(frameType, ball1Score, ball2Score)}>
        Save
      </button>
    </div>
  );
};
