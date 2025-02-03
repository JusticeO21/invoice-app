// Checkbox.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "./Checkbox";
import styles from "./Checkbox.module.css";

describe("Checkbox Component", () => {
  it("should render checkbox with label", () => {
    const label = "Accept terms and conditions";
    const checked = false;
    const name = "terms";

    render(
      <Checkbox
        label={label}
        checked={checked}
        onChange={vi.fn()}
        value={name}
      />
    );

    const checkboxLabel = screen.getByText(label);
    expect(checkboxLabel).toBeInTheDocument();

    const checkboxInput = screen.getByTestId("checkbox-input");
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeChecked();
  });

  it("should display the checkmark when checked", () => {
    const label = "Accept terms and conditions";
    const checked = true;
    const name = "terms";

    render(
      <Checkbox
        label={label}
        checked={checked}
        onChange={vi.fn()}
        value={name}
      />
    );

    const checkmark = screen.getByTestId("checkbox-span").querySelector("img");
    expect(checkmark).not.toHaveClass("hiddenMark");
  });

  it("should toggle checked state on click", () => {
    const label = "Accept terms and conditions";
    const checked = false;
    const name = "terms";
    const onChange = vi.fn();

    render(
      <Checkbox
        label={label}
        checked={checked}
        onChange={onChange}
        value={name}
      />
    );

    const checkboxInput = screen.getByTestId("checkbox-input");

    // Click to check the checkbox
    fireEvent.click(checkboxInput);
    expect(onChange).toHaveBeenCalled();

    // Now, simulate checking the checkbox
    fireEvent.click(checkboxInput);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("should not display checkmark when unchecked", () => {
    const label = "Accept terms and conditions";
    const checked = false;
    const name = "terms";

    render(
      <Checkbox
        label={label}
        checked={checked}
        onChange={vi.fn()}
        value={name}
      />
    );

    const checkmark = screen.getByTestId("checkbox-span").querySelector("span");
    expect(checkmark).toHaveClass(styles.hiddenMark);
  });
});
