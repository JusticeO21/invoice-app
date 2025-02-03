import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InvoiceCard from "./InvoiceCard";
import { formatCurrency } from "./utils";
import { BrowserRouter as Router } from "react-router-dom";

vi.mock("./utils", () => ({
  formatCurrency: vi.fn((amount: number) => `$${amount.toFixed(2)}`),
}));

describe("InvoiceCard component", () => {
  const invoiceData = {
    invoiceId: "INV12345",
    dueDate: "2025-01-15",
    name: "John Doe",
    amount: 500,
    status: "paid" as "paid" | "pending" | "draft",
  };

  it("should render invoice details correctly", () => {
    render(
      <Router>
        <InvoiceCard {...invoiceData} />
      </Router>
    );

    expect(screen.getByText(`${invoiceData.invoiceId}`)).toBeInTheDocument();

    const dueDateElement = screen.getByText(
      "Due " + new Date(invoiceData.dueDate).toDateString()
    );
    expect(dueDateElement).toBeInTheDocument();

    expect(screen.getByText(invoiceData.name)).toBeInTheDocument();

    expect(
      screen.getByText(formatCurrency(invoiceData.amount))
    ).toBeInTheDocument();

    expect(screen.getByText(invoiceData.status)).toBeInTheDocument();
  });

  it("should apply correct styles for the status", () => {
    render(
      <Router>
        <InvoiceCard {...invoiceData} />
      </Router>
    );

    const badge = screen.getByText(invoiceData.status);
    expect(badge.className).toContain("paid");
  });

  it("should navigate to the correct invoice page when clicked", () => {
    render(
      <Router>
        <InvoiceCard {...invoiceData} />
      </Router>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute(
      "href",
      `/invoice/${invoiceData.invoiceId}`
    );

    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe(`/invoice/${invoiceData.invoiceId}`);
  });

  it("should render the icon", () => {
    render(
      <Router>
        <InvoiceCard {...invoiceData} />
      </Router>
    );

    const icon = screen.getByAltText("arrow-right");
    expect(icon).toBeInTheDocument();
  });
});
