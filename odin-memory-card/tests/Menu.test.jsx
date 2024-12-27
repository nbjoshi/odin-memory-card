import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Menu from "../src/components/Menu";

describe("Menu Component", () => {
  it("should display difficulty buttons", () => {
    render(<Menu setDifficulty={() => {}} />);
    expect(screen.getByText(/Easy/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/Hard/i)).toBeInTheDocument();
  });

  it("should handle button clicks", async () => {
    const setDifficulty = vi.fn();
    const user = userEvent.setup();

    render(<Menu setDifficulty={setDifficulty} />);
    await user.click(screen.getByText(/Easy/i));

    expect(setDifficulty).toHaveBeenCalledWith("easy");
  });
});
