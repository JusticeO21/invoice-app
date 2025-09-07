import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heading } from "./Heading";
import styles from "./Heading.module.css";

describe("Heading Component", () => {
  it("should render the children correctly", () => {
    const text = "Welcome to the site!";
    render(<Heading>{text}</Heading>);
    const headingElement = screen.getByText(text);
    expect(headingElement).toBeInTheDocument();
  });

  it("should render with the correct tag based on variant", () => {
    const text = "This is a header";

    render(<Heading variant="h1">{text}</Heading>);
    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toBeInTheDocument();

    render(<Heading variant="h2">{text}</Heading>);
    const h2Element = screen.getByRole("heading", { level: 2 });
    expect(h2Element).toBeInTheDocument();

    render(<Heading variant="h3">{text}</Heading>);
    const h3Element = screen.getByRole("heading", { level: 3 });
    expect(h3Element).toBeInTheDocument();

    render(<Heading variant="h4">{text}</Heading>);
    const h4Element = screen.getByRole("heading", { level: 4 });
    expect(h4Element).toBeInTheDocument();

    render(<Heading variant="h5">{text}</Heading>);
    const h5Element = screen.getByRole("heading", { level: 5 });
    expect(h5Element).toBeInTheDocument();

    render(<Heading variant="h6">{text}</Heading>);
    const h6Element = screen.getByRole("heading", { level: 6 });
    expect(h6Element).toBeInTheDocument();
  });

  it("should default to h1 when no variant is provided", () => {
    const text = "Default Heading";
    render(<Heading>{text}</Heading>);
    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toBeInTheDocument();
  });

  it("should apply the custom className prop", () => {
    const text = "Styled Heading";
    const customClass = "custom-class";
    render(<Heading className={customClass}>{text}</Heading>);

    const headingElement = screen.getByText(text);
    expect(headingElement).toHaveClass(customClass);
  });

  it("should combine default styles with the className prop", () => {
    const text = "Styled Heading with default styles";

    render(
      <Heading variant="h2" className={styles.customClass}>
        {text}
      </Heading>
    );

    const h2Element = screen.getByRole("heading", { level: 2 });
    expect(h2Element).toHaveClass(styles.heading);
    expect(h2Element).toHaveClass(styles.customClass);
  });

  it("should spread additional props to the rendered element", () => {
    const text = "Heading with additional props";
    const additionalProps = { id: "custom-id", style: { color: "red" } };

    render(<Heading {...additionalProps}>{text}</Heading>);
    const headingElement = screen.getByText(text);

    expect(headingElement).toHaveAttribute("id", "custom-id");
    expect(headingElement).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
