import React from "react";

type SpareBallProps = {
  score: number;
  onClick: Function;
};

export const SpareBallComponent = ({ score, onClick }: SpareBallProps) => {
  return (
    <div onClick={() => onClick()} className="frame">
      {score}
    </div>
  );
};
