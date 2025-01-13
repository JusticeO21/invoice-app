
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeleteCard from "./DeleteCard";

describe("DeleteCard Component", () => {
  it("should render the component with the correct content", () => {
    const invoiceId = "12345";
    render(
      <DeleteCard invoiceId={invoiceId} onDelete={vi.fn()} onCancel={vi.fn()} />
    );

    const heading = screen.getByRole("heading", { name: "Confirm Deletion" });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(
      `Are you sure you want to delete invoice #${invoiceId}? This action cannot be undone.`
    );
    expect(text).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeInTheDocument();
  });

  it("should call onCancel when Cancel button is clicked", () => {
    const onCancel = vi.fn();
    const invoiceId = "12345";
    render(
      <DeleteCard
        invoiceId={invoiceId}
        onDelete={vi.fn()}
        onCancel={onCancel}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when Confirm button is clicked", () => {
    const onDelete = vi.fn();
    const invoiceId = "12345";
    render(
      <DeleteCard
        invoiceId={invoiceId}
        onDelete={onDelete}
        onCancel={vi.fn()}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("should render correctly when the invoiceId is dynamic", () => {
    const invoiceId = "67890";
    render(
      <DeleteCard invoiceId={invoiceId} onDelete={vi.fn()} onCancel={vi.fn()} />
    );

    const text = screen.getByText(
      `Are you sure you want to delete invoice #${invoiceId}? This action cannot be undone.`
    );
    expect(text).toBeInTheDocument();
  });

  it("should pass correct classes for the buttons", () => {
    const invoiceId = "12345";
    render(
      <DeleteCard invoiceId={invoiceId} onDelete={vi.fn()} onCancel={vi.fn()} />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton.className).toContain("secondary");

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton.className).toContain("danger");
  });

  it("should match snapshot", () => {
    const invoiceId = "12345";
    const { asFragment } = render(
      <DeleteCard invoiceId={invoiceId} onDelete={vi.fn()} onCancel={vi.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
