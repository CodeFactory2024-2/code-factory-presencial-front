import { Flight } from '@/types/Flight';
import { PlaneTakeoff } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchFieldsCombobox } from '@/constants/FormFields';
import { flightsData } from '../../../data/flightsData';

export default function SearchResults() {
  const router = useRouter();
  
  const { origin, destination, departureDate, returnDate, passengers, tripType } = router.query;
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    // Simulación de vuelos
    const mockFlights: Flight[] = flightsData;

    const filteredFlights: Flight[] = mockFlights.filter(flight =>
      flight.origin === origin &&
      flight.destination === destination &&
      flight.departureDate === departureDate &&
      flight.arrivalDate === returnDate &&
      flight.flightClass === tripType &&
      flight.passengers >= Number(passengers)
    );

    setFlights(filteredFlights);
  }, [origin, destination, departureDate, returnDate, passengers, tripType]);

  return (
    <div className="p-6 w-4/5">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl font-bold">Salida de {origin} a {destination} - {departureDate}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Recomendado:</span>
        <button className="ml-4 bg-gray-200 px-4 py-2 rounded-full text-gray-400 font-medium">Vuelos directos</button>
        <button className="ml-4 bg-gray-200 px-4 py-2 rounded-full text-gray-400">Mejor precio</button>
      </div>

      {flights.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No hay vuelos disponibles para las fechas seleccionadas.
          </div>
      ) : (
        <ul className="flex flex-col gap-8">
          {flights.map((flight, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4 flex justify-between items-center gap-5">
              <div className="flex items-center gap-6 w-full">
                <div className="text-2xl font-bold">{flight.departureTime}</div>
                <div className="text-sm text-gray-500">  
                  <div>{flight.origin}</div>
                  <div className="text-xs">{searchFieldsCombobox.find(search => flight.origin === search.value)?.label}</div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <hr className="w-full border-t-2 border-gray-300" />

                  <PlaneTakeoff className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  <hr className="w-full border-t-2 border-gray-300" />
                </div> 
                <div className="text-sm text-gray-500">
                  <div>{flight.destination}</div>  
                  <div className="text-xs">{searchFieldsCombobox.find(search => flight.destination === search.value)?.label}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MEJOR PRECIO</div>
                <div className="text-2xl font-bold">{flight.arrivalTime}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
