import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should render an input and a button", () => {
    render(<Input value="" setValue={() => {}} onClick={() => {}} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call the setValue function when the input changes", async () => {
    const setValue = vi.fn();
    render(<Input value="" setValue={setValue} onClick={() => {}} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");

    expect(setValue).toHaveBeenCalledWith("test");
  });

  it("button should be disabled when the input is empty", () => {
    render(<Input value="" setValue={() => {}} onClick={() => {}} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should call the onClick function when the button is clicked", async () => {
    const onClick = vi.fn();
    render(<Input value="test" setValue={() => {}} onClick={onClick} />);

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
