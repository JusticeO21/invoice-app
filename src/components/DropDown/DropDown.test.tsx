import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DropDown from "./DropDown";
import styles from "./DropDown.module.css";

vi.mock("../text/Text", () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

vi.mock("../icon/Icon", () => ({
  default: ({ src, alt, className }: any) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

describe("DropDown component", () => {
  const mockHandleSelect = vi.fn();
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("should render with the selected term and default to 'Net 1 Day'", () => {
    render(
      <DropDown
        options={options}
        handleSelect={mockHandleSelect}
        selectedTerm="option1"
      />
    );

    const toggleButton = screen.getByRole("button");

    expect(toggleButton).toHaveClass(styles.toggleButton);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("should open and close the dropdown menu when clicked", () => {
    render(
      <DropDown
        options={options}
        handleSelect={mockHandleSelect}
        selectedTerm="option1"
      />
    );

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should select an option and call handleSelect with the correct value", () => {
    render(
      <DropDown
        options={options}
        handleSelect={mockHandleSelect}
        selectedTerm="option1"
      />
    );

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    const option2 = screen.getByText("Option 2");

    fireEvent.click(option2);
    expect(mockHandleSelect).toHaveBeenCalledWith("option2");
  });

  it("should close the dropdown when clicking outside", () => {
    render(
      <DropDown
        options={options}
        handleSelect={mockHandleSelect}
        selectedTerm="option1"
      />
    );

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
