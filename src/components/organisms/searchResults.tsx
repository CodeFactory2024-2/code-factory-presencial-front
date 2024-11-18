import { Flight } from '@/types/Flight';
import { PlaneTakeoff } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { searchFieldsCombobox, searchFieldsTypeFlight } from '@/constants/FormFields';
import { flightsData } from '../../../data/flightsData';

export default function SearchResults() {
  const router = useRouter();

  const { origin, destination, departureDate, returnDate, passengers, tripType } = router.query;
  const [flights, setFlights] = useState<Flight[]>([]);
  const [sortByPrice, setSortByPrice] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    // Simulación de vuelos
    const mockFlights: Flight[] = flightsData;

    const filteredFlights: Flight[] = mockFlights.filter(flight => {
      // Verifica que cada criterio cumpla con el filtro o esté vacío/no especificado
      const matchesOrigin = flight.origin === origin;
      const matchesDestination = flight.destination === destination;
      const matchesDepartureDate = !departureDate || flight.departureDate === departureDate;
      const matchesReturnDate = !returnDate || flight.arrivalDate === returnDate;
      const matchesTripType = !tripType || tripType === flight.flightClass;
      const matchesPassengers = !passengers || flight.passengers >= Number(passengers);
  
      // Retorna `true` si todos los criterios coinciden
      return matchesOrigin && matchesDestination && matchesDepartureDate &&
             matchesReturnDate && matchesTripType && matchesPassengers;
    });

    if(sortByPrice){
      filteredFlights.sort((a,b)=> a.price - b.price);
    }

    setFlights(filteredFlights);
  }, [origin, destination, departureDate, returnDate, passengers, tripType, sortByPrice]);

  const handleSortByPrice = () => {
    setSortByPrice(prevSortByPrice => !prevSortByPrice);
  };

  return (
    <div className="p-6 w-4/5">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xl font-bold">Salida de {origin} a {destination} - {departureDate}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Recomendado:</span>
        <button className="ml-4 bg-gray-200 px-4 py-2 rounded-full text-gray-400 font-medium">Vuelos directos</button>
        <button onClick={handleSortByPrice} className={`ml-4 px-4 py-2 rounded-full font-bold ${sortByPrice ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
          Mejor precio
        </button>
      </div>

      {flights.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No hay vuelos disponibles para las fechas seleccionadas.
          </div>
      ) : (
        <ul className="flex flex-col gap-8">
          {flights.map((flight, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between  gap-5">
              <div className='text-orange-400 font-bold'>{searchFieldsTypeFlight.find(search => flight.flightClass === search.value)?.label}</div>
              <div className='w-full flex'>
                <div className="flex items-center gap-6 w-full">
                  <div>
                    <div className="text-2xl font-bold">{flight.departureTime}</div>
                    <div className='text-xs'>{flight.departureDate}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="text-xs">{searchFieldsCombobox.find(search => flight.origin === search.value)?.label}</div>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <hr className="w-full border-t-2 border-gray-300" />
                    <PlaneTakeoff className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    <hr className="w-full border-t-2 border-gray-300" />
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="text-xs">{searchFieldsCombobox.find(search => flight.destination === search.value)?.label}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">{`${flight.price}$`} </div>
                  <div>
                    <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                    <div className='text-xs'>{flight.arrivalDate}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
