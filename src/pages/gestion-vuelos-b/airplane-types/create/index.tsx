import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";

const MAX_ALLOWED_SEATS_ROWS = 8;

export default function CreateAirplaneTypePage() {

  const families = [
    {
      id: 1,
      name: "Airbus",
    },
    {
      id: 2,
      name: "Boeing",
    },
    {
      id: 3,
      name: "Embraer",
    },
    {
      id: 4,
      name: "Bombardier",
    }
  ];

  const [seatsDistribution, setSeatsDistribution] = useState<Record<number, number | null>>({
    0: 1
  }
  );

  const handleSeatsDistributionAdd = () => {
    if (Object.keys(seatsDistribution).length >= MAX_ALLOWED_SEATS_ROWS) {
      return
    }
    setSeatsDistribution({
      ...seatsDistribution,
      [Math.max(...Object.keys(seatsDistribution).map(Number)) + 1]: 1
    });
  }

  const handleSeatsDistributionChange = (index: number, value: string) => {
    setSeatsDistribution({
      ...seatsDistribution,
      [index]: value === "" ? null : parseInt(value)
    });
  }

  const handleSeatsDistributionRemove = (index: number) => {
    if (Object.keys(seatsDistribution).length === 1) {
      return;
    }

    const newSeatsDistribution = { ...seatsDistribution };
    delete newSeatsDistribution[index];
    setSeatsDistribution(newSeatsDistribution);
  }


  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-6 w-full p-4 sm:p-12">
        <h1 className="text-4xl font-bold">Agregar aeronave</h1>
        <div
          className="flex relative flex-col items-start gap-8" x-chunk="dashboard-03-chunk-0"
        >
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Características del modelo
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" type="text" placeholder="Ej. A320" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="family">Familia</Label>
                  <Select>
                    <SelectTrigger
                      id="family"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Selecciona una familia" />
                    </SelectTrigger>
                    <SelectContent>
                      {families.map((family) => (
                        <SelectItem key={family.id} value={family.id.toString()}>
                          {family.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="maxSeats">Número de asientos</Label>
                  <Input id="maxSeats" type="number" placeholder="Ej. 100" min={1} max={10000} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Label htmlFor="seatsDistribution">Distribución de asientos:{" "}
                  <span className="text-primary tracking-[0.5rem]">
                    {Object.values(seatsDistribution).map(x => x ?? 'X').join("-")}
                  </span>
                </Label>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleSeatsDistributionAdd}
                  className="justify-center w-fit"
                  disabled={Object.keys(seatsDistribution).length >= MAX_ALLOWED_SEATS_ROWS}
                >
                  <Plus size={24} /> Agregar fila
                </Button>
              </div>
              <div className="w-full flex gap-4 justify-between flex-wrap">
                {
                  Object.entries(seatsDistribution).map(([index, value]) => (
                    <div key={index} className="flex-[1_1_12rem] flex flex-col items-center w-full gap-4">
                      <Input
                        id={`seatsDistribution[${index}]`}
                        type="number"
                        min={1}
                        max={10}
                        placeholder="Ej. 3"
                        value={value ?? ''}
                        className="text-center text-2xl"
                        onChange={(e) => handleSeatsDistributionChange(parseInt(index), e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => handleSeatsDistributionRemove(parseInt(index))}
                        className="justify-center w-12 text-red-600"
                        disabled={Object.keys(seatsDistribution).length === 1}
                      >
                        Eliminar fila
                      </Button>
                    </div>
                  ))
                }
              </div>
            </fieldset>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="secondary">Cancelar</Button>
              <Button type="submit" variant="default">Crear aeronave</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}