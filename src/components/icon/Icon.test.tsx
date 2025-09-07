import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Icon from "./Icon";
import styles from "./icon.module.css";

describe("Icon Component", () => {
  it("should render the icon with the correct src and alt attributes", () => {
    const src = "path/to/icon.svg";
    const alt = "Icon description";
    render(<Icon src={src} alt={alt} />);

    const iconImage = screen.getByRole("img");
    expect(iconImage).toHaveAttribute("src", src);
    expect(iconImage).toHaveAttribute("alt", alt);
  });

  it("should apply the default size and radius classes", () => {
    render(<Icon src="path/to/icon.svg" alt="default icon" />);

    const iconImage = screen.getByRole("img");

    expect(iconImage).toHaveClass(styles.sm);
    expect(iconImage).toHaveClass(styles.rounded);
  });

  it("should apply the correct size class based on the size prop", () => {
    render(<Icon src="path/to/icon.svg" alt="icon" size="lg" />);

    const iconImage = screen.getByRole("img");

    expect(iconImage).toHaveClass(styles.lg);
  });

  it("should apply the correct radius class based on the radius prop", () => {
    render(<Icon src="path/to/icon.svg" alt="icon" radius="rounded-full" />);

    const iconImage = screen.getByRole("img");

    expect(iconImage).toHaveClass(styles["rounded-full"]);
  });

  it("should merge custom className with default classes", () => {
    const customClass = "custom-class";
    render(<Icon src="path/to/icon.svg" alt="icon" className={customClass} />);

    const iconSpan = screen.getByRole("img").parentElement;

    expect(iconSpan).toHaveClass(styles.icon);
    expect(iconSpan).toHaveClass(customClass);
  });

  it("should apply a fallback size class if an invalid size is provided", () => {
    //@ts-ignore
    render(<Icon src="path/to/icon.svg" alt="icon" size="invalid-size" />);

    const iconImage = screen.getByRole("img");

    expect(iconImage).toHaveClass(styles.sm);
  });

  it("should apply a fallback radius class if an invalid radius is provided", () => {
    //@ts-ignore
    render(<Icon src="path/to/icon.svg" alt="icon" radius="invalid-radius" />);

    const iconImage = screen.getByRole("img");

    expect(iconImage).toHaveClass(styles.rounded);
  });
});
