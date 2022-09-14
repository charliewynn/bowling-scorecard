import React from "react";
import Game from "../Models/Game/Game";
import { FrameComponent } from "./FrameComponent";

import "./GameComponent.css";
import { SpareBallComponent } from "./SpareBallComponent";

type GameProps = {
  game: Game;
};

export const GameComponent = ({ game }: GameProps) => {
  const lastFrameType = game.frames[9].scoreType;

  return (
    <div className="game">
      <h2>Score: {game.score}</h2>
      <div className="frames">
        {game.frames.map((frame, index) => (
          <FrameComponent key={index} frame={frame} />
        ))}
        <SpareBallComponent score={game.extraBall1} />
        <SpareBallComponent score={game.extraBall2} />
      </div>
    </div>
  );
};
