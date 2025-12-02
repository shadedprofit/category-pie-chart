import { render, screen } from "@testing-library/react";
import App from "~/App";
import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders the app", () => {
    render(<App />);

    const container = screen.getByTestId("app-container");
    expect(container).toBeInTheDocument();
  });
});
