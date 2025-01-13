import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";
import styles from "./Button.module.css";

describe("Button component", () => {
    it("should render with default variant and children", () => {
        render(<Button>Primary Button</Button>);

        const buttonElement = screen.getByText("Primary Button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass(styles.button, styles.primary);
    });

    it("should apply a custom variant", () => {
        render(<Button variant="secondary">Secondary Button</Button>);

        const buttonElement = screen.getByText("Secondary Button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass(styles.button, styles.secondary);
    });

    it("should apply a custom radius", () => {
        render(<Button radius="rounded-full">Rounded Full Button</Button>);

        const buttonElement = screen.getByText("Rounded Full Button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass(styles.button, styles["rounded-full"]);
    });

    it("should apply custom className and variant", () => {
        render(
            <Button className="custom-class" variant="danger">
                Danger Button
            </Button>
        );

        const buttonElement = screen.getByText("Danger Button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass("custom-class");
        expect(buttonElement).toHaveClass(styles.button, styles.danger);
    });

    it("should apply custom radius with variant", () => {
        render(
            <Button variant="tertiary" radius="rounded-md">
                Tertiary Rounded Button
            </Button>
        );

        const buttonElement = screen.getByText("Tertiary Rounded Button");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass(
            styles.button,
            styles.tertiary,
            styles["rounded-md"]
        );
    });

    it("should handle button click event", () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Clickable Button</Button>);

        const buttonElement = screen.getByText("Clickable Button");
        buttonElement.click();

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
