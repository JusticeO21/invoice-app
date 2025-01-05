import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Badge from "./Badge";
import styles from "./Badge.module.css";

describe("Badge component", () => {
  it("should render with default variant and correct children", () => {
    render(<Badge>Paid Badge</Badge>);

    const badgeElement = screen.getByText("Paid Badge");

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass(styles.badge, styles.paid);
    expect(badgeElement).toHaveAttribute("role", "status");
    expect(badgeElement).toHaveAttribute("aria-live", "polite");
  });

  it("should render with a custom variant", () => {
    render(<Badge variant="pending">Pending Badge</Badge>);

    const badgeElement = screen.getByText("Pending Badge");

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass(styles.badge, styles.pending);
  });

  it("should apply the custom aria-label", () => {
    render(<Badge ariaLabel="Custom label">Custom Label Badge</Badge>);

    const badgeElement = screen.getByText("Custom Label Badge");

    expect(badgeElement).toHaveAttribute("aria-label", "Custom label");
  });

  it("should apply the custom aria-live attribute", () => {
    render(<Badge ariaLive="assertive">Assertive Badge</Badge>);

    const badgeElement = screen.getByText("Assertive Badge");

    expect(badgeElement).toHaveAttribute("aria-live", "assertive");
  });

  it("should apply custom className and variant classes", () => {
    render(
      <Badge className="pending" variant="draft">
        Draft Badge
      </Badge>
    );

    const badgeElement = screen.getByText("Draft Badge");

    expect(badgeElement).toHaveClass("pending");
    expect(badgeElement).toHaveClass(styles.badge, styles.draft);
  });

  it("should render the oval element inside the badge", () => {
    render(<Badge>Badge with Oval</Badge>);

    const ovalElement = screen.getByRole("presentation", { hidden: true });

    expect(ovalElement).toBeInTheDocument();
    expect(ovalElement).toHaveClass(styles.oval);
  });
});
