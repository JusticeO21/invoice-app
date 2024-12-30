// Avatar.test.tsx
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";
import { expect, vi, describe, test } from "vitest";
import "@testing-library/jest-dom"; 


// Mock the Icon component to avoid rendering it during the test
vi.mock("../icon/Icon.tsx", () => ({
  __esModule: true,
  default: ({ src, alt, size, radius, className }: any) => (
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
    expect(icon).toHaveClass("small"); // Assuming your Avatar.module.css defines the 'small' class

    rerender(<Avatar src="avatar.jpg" alt="John Doe" size="medium" />);

    icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveClass("medium"); // Assuming your Avatar.module.css defines the 'medium' class

    rerender(<Avatar src="avatar.jpg" alt="John Doe" size="large" />);

    icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveClass("large"); // Assuming your Avatar.module.css defines the 'large' class
  });

  test("defaults to 'small' size if no size is provided", () => {
    render(<Avatar src="avatar.jpg" alt="John Doe" />);

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveClass("small");
  });
});