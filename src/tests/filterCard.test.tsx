import React from "react";
import FilterCard from "../components/molecules/filterCard";
import { render, screen } from "@testing-library/react";

const onScalesChangeFn = jest.fn();

describe("FilterCard", () => {
  it("renders FilterCard component", () => {
    render(<FilterCard onScalesChange={onScalesChangeFn} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });
});
