import React from "react";

type SpareBallProps = {
  score: number;
};

export const SpareBallComponent = ({ score }: SpareBallProps) => {
  return <div className="frame">{score}</div>;
};
