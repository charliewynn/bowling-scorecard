import Frame, { FrameScoreType } from "./Frame";

test("new frame has score = 0", () => {
  const frame = new Frame();
  expect(frame.totalPins).toBe(0);
});

test("new frame has frameType = 'none'", () => {
  const frame = new Frame();
  expect(frame.scoreType).toBe(FrameScoreType.none);
});

test("frame with score has correct score", () => {
  const frame = new Frame();
  frame.RecordScore(5, 2);
  expect(frame.totalPins).toBe(7);
  expect(frame.scoreType).toBe(FrameScoreType.none);
});

test("frame with strike to have score = 10", () => {
  const frame = new Frame();
  frame.RecordStrike();
  expect(frame.totalPins).toBe(10);
  expect(frame.scoreType).toBe(FrameScoreType.strike);
});

test("frame with spare to have score = 10", () => {
  const frame = new Frame();
  frame.RecordSpare(5, 5);
  expect(frame.totalPins).toBe(10);
  expect(frame.scoreType).toBe(FrameScoreType.spare);
});

test("Frame can be created from another frame", () => {
  const frame = new Frame();
  frame.RecordSpare(1, 9);
  const frame2 = new Frame(frame);
  expect(frame2.scoreType).toBe(FrameScoreType.spare);
});
