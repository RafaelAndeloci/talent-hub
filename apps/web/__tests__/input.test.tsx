import { Input } from "@/components/ui/input";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

function CostInput() {
  const [value, setValue] = React.useState("");

  const removeDollarSign = (value: string) =>
    value[0] === "$" ? value.slice(1) : value;
  const getReturnValue = (value: string) => (value === "" ? "" : `$${value}`);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const inputtedValue = ev.currentTarget.value;
    const noDollarSign = Number(removeDollarSign(inputtedValue));
    if (isNaN(noDollarSign)) return;
    setValue(getReturnValue(noDollarSign.toString()));
  };

  return (
    <Input value={value} aria-label="cost-input" onChange={handleChange} />
  );
}

const setup = (index: number) => {
  const { container, getAllByLabelText, ...utils } = render(<CostInput />);
  const input = getAllByLabelText("cost-input")[index];
  return {
    input,
    ...utils,
  };
};

describe("Input", () => {
  it("Should render input with placeholder when placeholder is provided", () => {
    const { container } = render(
      <Input id="text-input" placeholder="A Testing input" />,
    );

    const inputElement = container.querySelector("#text-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveProperty("placeholder", "A Testing input");
  });

  it("It should keep a $ in front of the input", () => {
    const { input } = setup(0);
    const inputEl = input as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: "23" } });
    expect(inputEl.value).toBe("$23");
  });
  it("It should allow a $ to be in the input when the value is changed", () => {
    const { input } = setup(1);
    const inputEl = input as HTMLInputElement;

    fireEvent.change(inputEl, { target: { value: "$23" } });
    expect(inputEl.value).toBe("$23");
  });

  it("It should not allow letters to be inputted", () => {
    const { input } = setup(2);
    const inputEl = input as HTMLInputElement;
    expect(inputEl.value).toBe(""); // empty before
    fireEvent.change(inputEl, { target: { value: "Good Day" } });
    expect(inputEl.value).toBe(""); //empty after
  });

  it("It should allow the $ to be deleted", () => {
    const { input } = setup(3);
    const inputEl = input as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: "23" } });
    expect(inputEl.value).toBe("$23"); // need to make a change so React registers "" as a change
    fireEvent.change(inputEl, { target: { value: "" } });
    expect(inputEl.value).toBe("$0");
  });
});
