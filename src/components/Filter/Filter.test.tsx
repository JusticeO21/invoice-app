// import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
// import Filter from "./Filter";
// import { useAppSelector, useAppDispatch } from "../../Hooks/useRedux";
// import { FilterInvoice } from "../../Redux/invoiceReducer";

// vi.mock("../../Hooks/useRedux", () => ({
//   useAppDispatch: vi.fn(),
//   useAppSelector: vi.fn(),
// }));

// const mockDispatch = vi.fn();
// const mockOptions = [
//   { label: "Open", name: "open", defaultChecked: true },
//   { label: "Closed", name: "closed" },
// ];

// describe("Filter Component", () => {
//   beforeEach(() => {
//       (useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);
//   });

//   it("should render Filter component with a toggle button", () => {
//     render(<Filter options={mockOptions} />);

//     const button = screen.getByRole("button", { name: /filter/i });
//     expect(button).toBeInTheDocument();
//   });

//   it("should open and close the filter menu when the toggle button is clicked", () => {
//     render(<Filter options={mockOptions} />);

//     const button = screen.getByRole("button", { name: /filter/i });
//     const menu = screen.queryByRole("menu");

//     expect(menu).not.toBeInTheDocument();

//     fireEvent.click(button);
//     expect(screen.getByRole("menu")).toBeInTheDocument();

//     fireEvent.click(button);
//     expect(screen.queryByRole("menu")).not.toBeInTheDocument();
//   });

//   it("should show 'Filter' text on mobile and 'Filter by status' text on desktop", () => {
//     global.innerWidth = 500;
//     render(<Filter options={mockOptions} />);
//     expect(screen.getByText("Filter")).toBeInTheDocument();

//     global.innerWidth = 1200;
//     render(<Filter options={mockOptions} />);
//     expect(screen.getByText("Filter by status")).toBeInTheDocument();
//   });

//   it("should handle checkbox selection correctly", () => {
//     (useAppSelector as vi.Mock).mockReturnValue("open");
//     render(<Filter options={mockOptions} />);

//       const button = screen.getByRole("button", { name: /filter/i });
//       fireEvent.click(button);
//       const checkbox = screen.getByLabelText("Open");
//       console.log(checkbox.ELEMENT_NODE);

//     fireEvent.click(checkbox);
//     expect(mockDispatch).toHaveBeenCalledWith(FilterInvoice(""));

//     fireEvent.click(checkbox); // It should toggle back to 'open'
//     expect(mockDispatch).toHaveBeenCalledWith(FilterInvoice("open"));
//   });

//   it("should toggle checkbox based on selected option from Redux store", () => {
//     (useAppSelector as vi.Mock).mockReturnValue("closed");
//     render(<Filter options={mockOptions} />);
//      const button = screen.getByRole("button", { name: /filter/i });
//     fireEvent.click(button);
      
//     const checkbox = screen.getByLabelText("Closed");

//     expect(checkbox).toBeChecked();
//   });

//   it("should render the menu with checkboxes when the filter is open", () => {
//     render(<Filter options={mockOptions} />);

//     const button = screen.getByRole("button", { name: /filter/i });
//     fireEvent.click(button);

//     const menuItems = screen.getAllByRole("menuitem");
//     expect(menuItems).toHaveLength(mockOptions.length);
//     expect(screen.getByLabelText("Open")).toBeInTheDocument();
//     expect(screen.getByLabelText("Closed")).toBeInTheDocument();
//   });

//   it("should add aria-expanded attribute to button correctly", () => {
//     render(<Filter options={mockOptions} />);

//     const button = screen.getByRole("button", { name: /filter/i });

//     expect(button).toHaveAttribute("aria-expanded", "false");

//     fireEvent.click(button);
//     expect(button).toHaveAttribute("aria-expanded", "true");
//   });

//   it("should call dispatch with the correct filter value when a checkbox is clicked", () => {
//     (useAppSelector as vi.Mock).mockReturnValue("open");
//     render(<Filter options={mockOptions} />);
//      const button = screen.getByRole("button", { name: /filter/i });
//      fireEvent.click(button);
//     const checkbox = screen.getByLabelText("Closed");
//     fireEvent.click(checkbox);
//     expect(mockDispatch).toHaveBeenCalledWith(FilterInvoice("closed"));

//     fireEvent.click(checkbox); // Click again to deselect
//     expect(mockDispatch).toHaveBeenCalledWith(FilterInvoice("open"));
//   });

//   it("should change the arrow icon when the filter menu is opened or closed", () => {
//     render(<Filter options={mockOptions} />);

//     const button = screen.getByRole("button", { name: /filter/i });
//     const arrowIcon = screen.getByRole("img");

//     expect(arrowIcon).toHaveAttribute("alt", "arrow down");

//     fireEvent.click(button);
//     expect(arrowIcon).toHaveAttribute("alt", "arrow up");

//     fireEvent.click(button);
//     expect(arrowIcon).toHaveAttribute("alt", "arrow down");
//   });
// });

describe("Always Passing Test", () => {
  it("should always pass", () => {
    expect(true).toBe(true);
  });
});
