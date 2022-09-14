import Frame from "../Frame/Frame";
import Game from "./Game";

test("new game has score = 0", () => {
  const game = new Game();
  expect(game.score).toBe(0);
});

test("next ball from strike, strike, strike is [10,10]", () => {
  const game = new Game();
  const strikeFrame = new Frame();
  strikeFrame.RecordStrike();
  game.recordFrame(strikeFrame, 0);
  game.recordFrame(strikeFrame, 1);
  game.recordFrame(strikeFrame, 2);

  const nextBalls = game.nextBallPinsFromFrame(0);
  expect(nextBalls).toEqual([10, 10]);

  expect(game.nextBallPinsFromFrame(1)).toEqual([10, 0]);
});

test("Total Game Score on every ball in a 5", () => {
  const fiveFiveFrame = new Frame().RecordSpare(5, 5);
  expect(fiveFiveFrame.totalPins).toBe(10);

  const game = new Game();
  game.recordFrame(fiveFiveFrame, 0);
  game.recordFrame(fiveFiveFrame, 1);
  game.recordFrame(fiveFiveFrame, 2);
  game.recordFrame(fiveFiveFrame, 3);
  game.recordFrame(fiveFiveFrame, 4);
  game.recordFrame(fiveFiveFrame, 5);
  game.recordFrame(fiveFiveFrame, 6);
  game.recordFrame(fiveFiveFrame, 7);
  game.recordFrame(fiveFiveFrame, 8);
  game.recordFrame(fiveFiveFrame, 9);
  game.recordExtraBallScores(5);
  expect(game.score).toBe(150);
});
