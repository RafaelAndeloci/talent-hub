import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

describe("Button", () => {
  it("Should render button with text when text is provided", () => {
    const { container } = render(<Button id="text-button">Click me!</Button>);

    const buttonElement = container.querySelector("#text-button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/Click me!/i);
  });

  it("Should be dispatch click events", () => {
    let count = 0;

    function increment() {
      count++;
    }

    const { container } = render(
      <Button onClick={increment} id="clickable-button" />,
    );

    const buttonElement = container.querySelector("#clickable-button");

    expect(buttonElement).toBeInTheDocument();

    expect(count).toBe(0);
    fireEvent.click(buttonElement!);
    expect(count).toBe(1);
  });
});
