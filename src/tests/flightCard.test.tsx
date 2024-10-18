import React from "react";
import { render, screen } from "@testing-library/react";
import FlightCard from "../components/molecules/flightCard";
import Flight from "@/utils/interface/flight";

const flightMock = jest.mocked<Flight>({
  origin: "Medellín",
  destination: "Bogotá",
  time: "19:20:00T",
  scales: 2,
  date: "19/10/2024",
  prices: {
    first: 10,
    business: 8,
    economy: 5,
  },
});

describe("FlightCard Component", () => {
  test("renders FlightCard component", () => {
    render(<FlightCard flight={flightMock} />);
    expect(screen.getByText(/Destination/)).toBeInTheDocument();
    expect(screen.getByText(/Origin/)).toBeInTheDocument();
    expect(screen.getByText(/Date and time/)).toBeInTheDocument();
    expect(screen.getByText(/Number of scales/)).toBeInTheDocument();
    expect(screen.getByText(/Category/)).toBeInTheDocument();
    expect(screen.getByText(/Reserve/)).toBeInTheDocument();
  });
});
