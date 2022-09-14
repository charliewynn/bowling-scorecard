import { render, screen } from "@testing-library/react";
import { GameComponent } from "./GameComponent";
import Game from "../../Models/Game/Game";

test("new game renders as score=0", () => {
  const game = new Game();
  render(<GameComponent game={game} />);
  const linkElement = screen.getByText(/score: 0/i);
  expect(linkElement).toBeInTheDocument();
});
