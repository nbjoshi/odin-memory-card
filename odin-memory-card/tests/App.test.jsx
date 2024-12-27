import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/components/App";

describe("App Component", () => {
  it("should display the header text and high score", () => {
    render(<App />);
    expect(screen.getByText(/Fortnite Memory Game/i)).toBeInTheDocument();
    expect(screen.getByText(/High Score: 0/i)).toBeInTheDocument();
  });

  it("should display the Menu when no difficulty is set", () => {
    render(<App />);
    expect(screen.getByText(/Choose a difficulty!/i)).toBeInTheDocument();
  });

  it("should conditionally render GameWindow or Result based on gameOver state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByText(/Easy/i));

    expect(screen.getByText(/Loading your 5 skins/i)).toBeInTheDocument();

    const setGameOverMock =
      screen.getByText(/Loading your 5 skins/i).parentNode;
    setGameOverMock.click();
  });
});
