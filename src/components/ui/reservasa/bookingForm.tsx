import { CardContent, CardFooter } from "../card";
import { Separator } from "../separator";
import { Button } from "../button";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { ReservationRequest } from "@/types/booking";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PassengerDB } from "@/types/passenger";
import { PassengerCard } from "./passengerCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FLIGHTS } from "@/graphql/query/flight";
import { FlightSelection } from "@/types/flight";
import { SAVE_RESERVATION } from "@/graphql/mutation/reservation";

const BookingForm = ({
  passengers,
  setShowBookingForm,
  setShowPassengerForm,
  setPassengers,
  showPassengerCard,
  setShowPassengerCard,
}: {
  passengers: PassengerDB[];
  setShowBookingForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPassengerForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPassengers: React.Dispatch<React.SetStateAction<PassengerDB[]>>;
  showPassengerCard: boolean;
  setShowPassengerCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [flightId, setFlightId] = useState<number | null>(null);

  const { data: flights } = useQuery<FlightSelection>(GET_FLIGHTS);
  const [saveReservation] = useMutation(SAVE_RESERVATION);

  useEffect(() => {
    if (flights) {
      console.log(flights);
    }
  }
    , [flights
    ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setFlightId(parseInt(data.flight as string));
    setShowPassengerForm(true);
    setShowBookingForm(false);
  };

  const saveBooking = async () => {
    if (passengers.length === 0) {
      return;
    }

    const booking: ReservationRequest = {
      flightId: flightId as number,
      passengerIds: passengers.map((passenger) => passenger.id)

    };

    const bookingSaved = await saveReservation({
      variables: {
        input: booking,
      },
    });

    if (bookingSaved) {
      setShowPassengerCard(false);
      setPassengers([]);
      setFlightId(null);
      const bookingCode = bookingSaved.data.saveReservation.reservationCode;

      Swal.fire({
        title: "Reserva guardada",
        text: `Su código de reserva es: ${bookingCode}`,
        icon: "success",
      });
    }
  };

  const previousStep = () => {
    setShowBookingForm(false);
    setShowPassengerForm(true);
  };

  return (
    <div className={`${showPassengerCard ? "grid grid-cols-2 gap-4 p-8" : ""}`}>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 text-sm">
          <div className="flex flex-col space-y-3">
            <div className="font-semibold">Información de la reserva</div>
            <ul className="flex flex-col space-y-3">
              <li className="flex items-center justify-between md:space-x-3">
                <span className="text-muted-foreground">Vuelo</span>
                <div>
                  {flights && (
                    <select
                      name="flight"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      id="flight"
                      required
                    >
                      <option value="">Seleccione un vuelo</option>
                      {flights.allFlights.map((flight) => (
                        <option key={flight.id} value={flight.id}>
                          {flight.origin} - {flight.destination}
                        </option>
                      ))}
                    </select>
                  )
                  }
                </div>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="flex justify-end">
          {!showPassengerCard ? (
            <Button type="submit" className="flex " id="rightArrow">
              <AiFillCaretRight />
            </Button>
          ) : (
            <div className="flex space-x-36">
              <div>
                <Button type="button" onClick={previousStep} id="leftArrow">
                  <AiFillCaretLeft />
                </Button>
              </div>
              <div>
                <Button type="button" onClick={saveBooking} id="submitBooking">
                  Guardar Reserva
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </form>
      <div
        className={`flex flex-col space-y-4 ${showPassengerCard ? "block" : "hidden"
          }`}
      >
        {passengers.map((passenger, index) => (
          <PassengerCard
            key={index}
            passenger={passenger}
            passengers={passengers}
            setPassengers={setPassengers}
          />
        ))}
      </div>
    </div>
  );
};

export { BookingForm };
