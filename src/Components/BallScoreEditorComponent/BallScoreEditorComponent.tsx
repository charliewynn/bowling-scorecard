import React from "react";

type BallScoreEditorComponentProps = {
  score: number;
  onClick: Function;
};

export const BallScoreEditorComponent = ({
  score,
  onClick,
}: BallScoreEditorComponentProps) => {
  return (
    <div onClick={() => onClick()} className="frame">
      {score}
    </div>
  );
};
