import { CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import Image from "next/image";
import React from "react";
import { Bag, Baggage } from "../../Icons";
import { BoardingCard } from "@/types/checkinA/BoardingCard";

export const BoardingCardContent = ({
  passenger,
  code,
  group,
  seat,
}: BoardingCard) => {
  return (
    <CardContent className="grid gap-4 py-6">
      <div className="flex justify-between text-xl font-bold">
        <p>{passenger}</p>
        <p>{code}</p>
      </div>
      <div className="grid grid-cols-3 bg-green-50">
        <div className="text-center font-bold border border-gray-700 p-1">
          <p className="text-xs">HORA EN SALA</p>
          <p className="text-2xl">14:16</p>
        </div>
        <div className="text-center font-bold border border-gray-700 p-1">
          <p className="text-xs">GRUPO</p>
          <p className="text-2xl">{group}</p>
        </div>
        <div className="text-center font-bold border border-gray-700 p-1">
          <p className="text-xs">ASIENTO</p>
          <p className="text-2xl">{seat}</p>
        </div>
      </div>
      <p className="font-bold text-sm text-center">
        Verifica la sala en las pantallas del aeropuerto
      </p>
      <Separator />
      <div className="flex gap-10">
        <div className="flex flex-col gap-6">
          <div className="font-bold">
            <p className="text-md">
              <span className="text-xl">VUP</span> VALLEDUPAR
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              2024-03-29 | 15:56
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              VALLEDUPAR ALFO
            </p>
          </div>
          <div className="font-bold">
            <p className="text-md">
              <span className="text-xl">BOG</span> BOGOTÁ
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              2024-03-29 | 15:56
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              BOGOTÁ EL DOR, Terminal 1
            </p>
          </div>
        </div>

        {/* Este es un QR de ejemplo, mientras se implementa la funcionalidad de generarlos dinámicamente. */}
        <Image
          src="/assets/qr-ejemplo.png"
          width={150}
          height={150}
          alt="Código QR de ejemplo."
        />
      </div>
      <Separator />
      <div className="text-primary flex justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <Bag />
            <div className="text-black flex flex-col font-semibold">
              <small>Equipaje de mano</small>
              <small>Si</small>
            </div>
          </div>
          <p className="text-black text-sm mt-2">
            Reserva: <strong>{group}Q528X</strong>
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Baggage />
            <div className="text-black flex flex-col font-semibold">
              <small>Equipaje de bodega</small>
              <small>1x23kg</small>
            </div>
          </div>
          <p className="text-black text-sm mt-2">
            Operado por: <strong>Singapur Airlines</strong>
          </p>
        </div>
      </div>
    </CardContent>
  );
};
