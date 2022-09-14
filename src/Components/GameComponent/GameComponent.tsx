import React, { useState } from "react";
import Game from "../../Models/Game/Game";
import { FrameComponent } from "../FrameComponent/FrameComponent";

import "./GameComponent.css";
import { SpareBallComponent } from "../SpareBallComponent/SpareBallComponent";
import { EditFrameComponent } from "../EditFrameComponent/EditFrameComponent";
import { FrameScoreType } from "../../Models/Frame/Frame";

type GameProps = {
  game: Game;
};

export const GameComponent = ({ game }: GameProps) => {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<
    number | undefined
  >(undefined);

  const renderFrameEditor = () => {
    if (selectedFrameIndex === undefined) {
      return null;
    }
    if (selectedFrameIndex <= 9) {
      return (
        <>
          <div>you selected Frame {selectedFrameIndex + 1}</div>
          <EditFrameComponent
            onSave={(
              frameType: FrameScoreType,
              ball1Score: number,
              ball2Score: number
            ) => {
              console.log(frameType, ball1Score, ball2Score);
            }}
            frame={game.frames[selectedFrameIndex]}
          />
        </>
      );
    }
    return <div>you selected bonus ball : {selectedFrameIndex - 9}</div>;
  };
  return (
    <div className="game">
      <h2>Score: {game.score}</h2>
      <div className="frames">
        {game.frames.map((frame, index) => (
          <FrameComponent
            onClick={() => setSelectedFrameIndex(index)}
            key={index}
            frame={frame}
          />
        ))}
        <SpareBallComponent
          onClick={() => setSelectedFrameIndex(10)}
          score={game.extraBall1}
        />
        <SpareBallComponent
          onClick={() => setSelectedFrameIndex(11)}
          score={game.extraBall2}
        />
      </div>
      {renderFrameEditor()}
    </div>
  );
};
