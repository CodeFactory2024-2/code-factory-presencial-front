import { createContext, ReactNode, useContext, useState } from "react";

import { FormData as PassengerData } from "../types/checkinA/Form";

interface PassengerList {
  passengers: PassengerData[];
  addPassenger: (passenger: PassengerData) => void;
}

const CheckinAContext = createContext<PassengerList | undefined>(undefined);

function CheckinAProvider({ children }: { children: ReactNode }) {
  const [passengers, setPassengers] = useState<PassengerData[]>([]);

  const handleAddPassenger = (newPassenger: PassengerData) => {
    setPassengers((prevData) => [...prevData, newPassenger]);
  };

  return (
    <CheckinAContext.Provider
      value={{ passengers, addPassenger: handleAddPassenger }}
    >
      {children}
    </CheckinAContext.Provider>
  );
}

function useCheckinAContext() {
  const context = useContext(CheckinAContext);

  if (!context) {
    throw new Error(
      "useCheckinAContext debe ser usado dentro de un CheckinAProvider"
    );
  }

  return context;
}

export { CheckinAProvider, useCheckinAContext };
