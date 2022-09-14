import { render, screen } from "@testing-library/react";
import { FrameComponent } from "./FrameComponent";
import Frame from "../../Models/Frame/Frame";

test("strike frame renders X", () => {
  const frame = new Frame().RecordStrike();
  render(<FrameComponent onClick={() => null} frame={frame} />);
  const linkElement = screen.getByText(/X/);
  expect(linkElement).toBeInTheDocument();
});

test("spare frame renders /", () => {
  const frame = new Frame().RecordSpare(2, 8);
  render(<FrameComponent onClick={() => null} frame={frame} />);
  const linkElement = screen.getByText(/\//);
  expect(linkElement).toBeInTheDocument();
});
