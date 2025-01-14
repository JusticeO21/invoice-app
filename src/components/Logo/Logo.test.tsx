import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "./Logo";
import { BrowserRouter as Router } from "react-router-dom";

describe("Logo component", () => {
  const logoProps = {
    logoSrc: "/path/to/logo.png",
    altText: "Company Logo",
    linkUrl: "/home",
  };

  it("should render the logo image with the correct alt text", () => {
    render(
      <Router>
        <Logo {...logoProps} />
      </Router>
    );

    const logoImage = screen.getByAltText(logoProps.altText);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", logoProps.logoSrc);
  });

  it("should render the default linkUrl (/) if no linkUrl is provided", () => {
    render(
      <Router>
        <Logo logoSrc={logoProps.logoSrc} altText={logoProps.altText} />
      </Router>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("should navigate to the correct URL when linkUrl is provided", () => {
    render(
      <Router>
        <Logo {...logoProps} />
      </Router>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", logoProps.linkUrl);

    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe(logoProps.linkUrl);
  });

  it("should have correct accessibility attributes", () => {
    render(
      <Router>
        <Logo {...logoProps} />
      </Router>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("aria-label", "Go to homepage");
  });
});
