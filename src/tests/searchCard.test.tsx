import React from "react";
import { render, screen } from "@testing-library/react";
import SearchCard from "../components/molecules/searchCard";

const searchFnMock = jest.fn();

describe("SearchCard Component", () => {
  test("renders the SearchCard component", () => {
    render(<SearchCard onSearch={searchFnMock} />);
    expect(screen.getByText("Flight search")).toBeInTheDocument();
    expect(screen.getByText("Find the flight you need")).toBeInTheDocument();
  });
});
