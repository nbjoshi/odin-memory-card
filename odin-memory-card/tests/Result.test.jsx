import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Result from "../src/components/Result";

describe("Result Component", () => {
  it("should display the win message", () => {
    render(
      <Result
        result="win"
        handleMenuButton={() => {}}
        handleRestartGame={() => {}}
        endScore={10}
      />
    );
    expect(screen.getByText(/You Won!/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 10/i)).toBeInTheDocument();

    const victoryGif = screen.getByAltText(/victory_gif/i);
    expect(victoryGif).toBeInTheDocument();
    expect(victoryGif.src).toContain("fortnite-win.gif");
  });

  it("should display the game over message", () => {
    render(
      <Result
        result="lose"
        handleMenuButton={() => {}}
        handleRestartGame={() => {}}
        endScore={5}
      />
    );
    expect(
      screen.getByText(/Game over! Better luck next time./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Score: 5/i)).toBeInTheDocument();

    const lossGif = screen.getByAltText(/lose_gif/i);
    expect(lossGif).toBeInTheDocument();
    expect(lossGif.src).toContain("crying.gif");
  });
});
