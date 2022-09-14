import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Models/Game/Game";
import { GameComponent } from "./Components/GameComponent";
import Frame from "./Models/Frame/Frame";

function App() {
  const [game, setGame] = useState(new Game());
  useEffect(() => {
    const newGame = new Game();
    newGame.recordFrame(new Frame().RecordSpare(5, 5), 0);
    newGame.recordFrame(new Frame().RecordSpare(1, 9), 1);
    newGame.recordFrame(new Frame().RecordScore(5, 1), 2);
    newGame.recordFrame(new Frame().RecordScore(2, 0), 3);
    newGame.recordFrame(new Frame().RecordSpare(5, 5), 4);
    newGame.recordFrame(new Frame().RecordSpare(1, 9), 5);
    newGame.recordFrame(new Frame().RecordScore(5, 1), 6);
    newGame.recordFrame(new Frame().RecordStrike(), 7);
    newGame.recordFrame(new Frame().RecordSpare(2, 8), 8);
    newGame.recordFrame(new Frame().RecordSpare(6, 4), 9);
    newGame.recordExtraBallScores(8);
    setGame(newGame);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <GameComponent game={game} />
    </div>
  );
}

export default App;
