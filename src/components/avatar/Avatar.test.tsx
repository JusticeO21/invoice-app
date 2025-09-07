import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";
import { expect, vi, describe, test } from "vitest";
import "@testing-library/jest-dom";

type AvatarProps = {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  radius: string;
  className: string;
};

vi.mock("../icon/Icon.tsx", () => ({
  __esModule: true,
  default: ({ src, alt, size, radius, className }: AvatarProps) => (
    //@ts-ignore
    <div data-testid="mock-icon" className={className} alt={alt}>
      Mocked Icon: {src} - {size} - {radius}
    </div>
  ),
}));

describe("Avatar Component", () => {
  test("renders the Avatar button with the correct aria-label", () => {
    render(<Avatar src="avatar.jpg" alt="John Doe" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Avatar for John Doe");
  });

  test("renders the Icon with the correct props", () => {
    render(<Avatar src="avatar.jpg" alt="John Doe" />);

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent(
      "Mocked Icon: avatar.jpg - md - rounded-full"
    );
  });

  test("applies the correct class based on the size prop", () => {
    const { rerender } = render(
      <Avatar src="avatar.jpg" alt="John Doe" size="small" />
    );

    let icon = screen.getByTestId("mock-icon");
    expect(icon.className).toContain("small");

    rerender(<Avatar src="avatar.jpg" alt="John Doe" size="medium" />);

    icon = screen.getByTestId("mock-icon");
    expect(icon.className).toContain("medium");

    rerender(<Avatar src="avatar.jpg" alt="John Doe" size="large" />);

    icon = screen.getByTestId("mock-icon");
    expect(icon.className).toContain("large");
  });

  test("defaults to 'small' size if no size is provided", () => {
    render(<Avatar src="avatar.jpg" alt="John Doe" />);

    const icon = screen.getByTestId("mock-icon");
    expect(icon.className).toContain("small");
  });
});
