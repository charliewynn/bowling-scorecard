import React, { FC, useEffect, useState } from "react";
import Frame, { FrameScoreType } from "../../Models/Frame/Frame";
import "./EditFrameComponent.css";

export const EditFrameComponent: FC<{ frame: Frame; onSave: Function }> = ({
  frame,
  onSave,
}) => {
  useEffect(() => {
    setFrameType(frame.scoreType);
    setBall1Score(frame.ball1Score);
    setBall2Score(frame.ball2Score);
  }, [frame]);
  const [frameType, setFrameType] = useState<FrameScoreType>(frame.scoreType);
  const [ball1Score, setBall1Score] = useState<number>(frame.ball1Score);
  const [ball2Score, setBall2Score] = useState<number>(frame.ball2Score);

  const updateToNonStrikeSpare = () => {
    setFrameType(FrameScoreType.none);
    if (ball1Score + ball2Score === 10) {
      if (ball2Score > 0) {
        setBall2Score(ball2Score - 1);
      } else if (ball1Score > 0) {
        setBall1Score(ball1Score - 1);
      }
    }
  };
  const renderFrameTypeOptions = () => {
    return (
      <div className="frame-types">
        <button
          className={frameType === FrameScoreType.none ? "selected" : ""}
          onClick={() => updateToNonStrikeSpare()}
        >
          None
        </button>
        <button
          className={frameType === FrameScoreType.spare ? "selected" : ""}
          onClick={() => {
            setFrameType(FrameScoreType.spare);
            setBall2Score(10 - ball1Score);
          }}
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

  const updateBallScore = (
    newBallValue: number,
    ballSetFunction: Function,
    otherBallSetFunction: Function
  ) => {
    ballSetFunction(newBallValue);
    if (frameType === FrameScoreType.spare) {
      otherBallSetFunction(10 - newBallValue);
    }
  };
  const renderBallScoreOptions = () => {
    if (frameType === FrameScoreType.strike) {
      return null;
    }
    return (
      <div className="score">
        <div>
          <label htmlFor="ball1Score">First Ball: </label>
          <input
            id="ball1Score"
            value={ball1Score}
            type="number"
            max="9"
            min="0"
            onChange={(e) =>
              updateBallScore(+e.target.value, setBall1Score, setBall2Score)
            }
          />
        </div>
        <div>
          <label htmlFor="ball2Score">Second Ball: </label>
          <input
            id="ball2Score"
            value={ball2Score}
            type="number"
            max="10"
            min="0"
            onChange={(e) =>
              updateBallScore(+e.target.value, setBall2Score, setBall1Score)
            }
          />
        </div>
      </div>
    );
  };
  return (
    <div className="edit-frame-component">
      {renderFrameTypeOptions()}
      {renderBallScoreOptions()}

      <button onClick={() => onSave(frameType, ball1Score, ball2Score)}>
        Save
      </button>
    </div>
  );
};
