import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Game from "../../Models/Game/Game";
import { FrameComponent } from "../FrameComponent/FrameComponent";

import "./GameComponent.css";
import { SpareBallComponent } from "../SpareBallComponent/SpareBallComponent";
import { EditFrameComponent } from "../EditFrameComponent/EditFrameComponent";
import Frame, { FrameScoreType } from "../../Models/Frame/Frame";
import { updateJsxFragment } from "typescript";

type GameProps = {
  game: Game;
};

export const GameComponent = ({ game }: GameProps) => {
  const [selectedFrameIndex, setSelectedFrameIndex] = useState<
    number | undefined
  >(undefined);

  const [currGame, setCurrGame] = useState(game);
  useEffect(() => {
    setCurrGame(game);
  }, [game]);

  const updateFrame = (
    frameType: FrameScoreType,
    ball1Score: number,
    ball2Score: number
  ) => {
    try {
      if (selectedFrameIndex === undefined) {
        throw new Error("Cannot update frame");
      }
      const updatedFrame = new Frame();
      switch (frameType) {
        case FrameScoreType.none:
          updatedFrame.RecordScore(ball1Score, ball2Score);
          break;
        case FrameScoreType.spare:
          updatedFrame.RecordSpare(ball1Score, ball2Score);
          break;
        case FrameScoreType.strike:
          updatedFrame.RecordStrike();
          break;
      }
      currGame.recordFrame(updatedFrame, selectedFrameIndex);
      setCurrGame(currGame);
      setSelectedFrameIndex(undefined);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Unknown error while updating frame. Check the console");
        console.error("Unable to store frame", error);
      }
    }
  };
  const renderFrameEditor = () => {
    if (selectedFrameIndex === undefined) {
      return null;
    }
    if (selectedFrameIndex <= 9) {
      return (
        <>
          <div>you selected Frame {selectedFrameIndex + 1}</div>
          <EditFrameComponent
            onSave={updateFrame}
            frame={currGame.frames[selectedFrameIndex]}
          />
        </>
      );
    }
    return <div>you selected bonus ball : {selectedFrameIndex - 9}</div>;
  };
  return (
    <div className="game">
      <Toaster />
      <h2>Score: {currGame.score}</h2>
      <div className="frames">
        {currGame.frames.map((frame, index) => (
          <FrameComponent
            onClick={() => setSelectedFrameIndex(index)}
            key={index}
            frame={frame}
          />
        ))}
        <SpareBallComponent
          onClick={() => setSelectedFrameIndex(10)}
          score={currGame.extraBall1}
        />
        <SpareBallComponent
          onClick={() => setSelectedFrameIndex(11)}
          score={currGame.extraBall2}
        />
      </div>
      {renderFrameEditor()}
    </div>
  );
};
