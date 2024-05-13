// Counter.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  it("renders with initial state of 0", () => {
    render(<Counter />);
    expect(screen.getByRole("heading")).toHaveTextContent("Counter: 0");
  });

  it("increments the counter when increment button is clicked", () => {
    render(<Counter />);
    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);
    expect(screen.getByRole("heading")).toHaveTextContent("Counter: 1");
  });

  it("decrements the counter when decrement button is clicked", () => {
    render(<Counter />);
    const decrementButton = screen.getByText("Decrement");
    fireEvent.click(decrementButton);
    expect(screen.getByRole("heading")).toHaveTextContent("Counter: -1");
  });
});
