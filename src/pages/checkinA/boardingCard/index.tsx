import { BoardingCardContainer } from "@/components/checkinA/BoardingCard/BoardingCardContainer";
import { useCheckinAContext } from "@/context/CheckinAContext";
import { BoardingCard as BoardingCardType } from "@/types/checkinA/BoardingCard";
import { useEffect, useState } from "react";

export default function BoardingCard() {
  const { passengers } = useCheckinAContext();

  const [passengersCardData, setPassengersCardData] = useState<
    BoardingCardType[]
  >([]);

  useEffect(() => {
    const newData = passengers.map((pass, i) => ({
      id: crypto.randomUUID(),
      passenger: pass.fullName,
      code: crypto.randomUUID().slice(0, 6).toUpperCase(),
      group: "A",
      seat: `${i + 1}A`,
    }));

    setPassengersCardData(newData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">Tarjetas de Embarque</h1>
      <div className="flex gap-6">
        {passengersCardData.map((passengerData) => (
          <BoardingCardContainer key={passengerData.id} {...passengerData} />
        ))}
      </div>
    </div>
  );
}
