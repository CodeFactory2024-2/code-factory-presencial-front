import { Input } from "../input";
import { Passenger } from '@/types/passenger';
import { tipoDocumento } from "@/utils/tipoDocumento";
import { Button } from "../button";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import Swal from "sweetalert2";
import { CardFooter } from "../card";
import { Separator } from "../separator";
import { PassengerCard } from "./passengerCard";
import { useMutation } from "@apollo/client";
import { SAVE_PASSENGER } from "@/graphql/mutation/passenger";
import { PassengerDB } from '../../../types/passenger';
import { countries } from "@/utils/country";

const PassengerForm = ({
  passengers,
  setPassengers,
  setShowBookingForm,
  setShowPassengerForm,
  setShowPassengerCard,
}: {
  passengers: PassengerDB[];
  setPassengers: React.Dispatch<React.SetStateAction<PassengerDB[]>>;
  setShowBookingForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPassengerForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPassengerCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const [savePassenger] = useMutation(SAVE_PASSENGER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newPassenger: Passenger = {
      name: data.name as string,
      lastName: data.lastName as string,
      typeDni: data.typeDni as string,
      dni: data.dni as string,
      age: parseInt(data.age as string),
      email: data.email as string,
      phone: data.phone as string,
      nationality: data.nationality as string,
    };

    try {
      const result = await savePassenger({
        variables: {
          input: newPassenger,
        },
      });
      console.log(result);
      if (result.data) {
        setPassengers([...passengers, result.data.savePassenger]);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const previousStep = () => {
    setShowBookingForm(true);
    setShowPassengerForm(false);
    setShowPassengerCard(false);
  };

  const nextStep = () => {
    if (passengers.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes agregar al menos un pasajero",
      });
      return;
    }
    setShowBookingForm(true);
    setShowPassengerForm(false);
    setShowPassengerCard(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m-8 space-y-3">
          <div className="font-semibold">Información de los pasajeros</div>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nombres</span>
              <div>
                <Input type="text" name="name" required id="name"/>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Apellidos</dt>
              <div>
                <Input type="text" name="lastName" required id="lastName"/>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tipo de documento</span>
              <div className="justify-end w-1/2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  name="typeDni"
                  id="typeDni"
                  required
                >
                  <option value="">Elija una opción</option>
                  {tipoDocumento.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-3">
              <span className="text-muted-foreground">Número de documento</span>
              <div>
                <Input type="text" name="dni" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nacionalidad</span>
              <div className=" justify-end w-1/2">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  name="nationality"
                  id="nationality"
                >
                  <option value="">Elija una opción</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Edad</span>
              <div className="w-1/2">
                <Input type="number" min={1} max={120} name="age" required id="age"/>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Correo</span>
              <div>
                <Input type="email" name="email" required id="email"/>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Telefono</span>
              <div>
                <Input type="text" name="phone" id="phone" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button type="submit" id="submitPassenger">Añadir pasajero</Button>
            </div>
            <Separator className="my-4" />
            <CardFooter className="flex items-center justify-between">
              <Button type="button" onClick={previousStep} id="leftArrow2">
                <AiFillCaretLeft />
              </Button>
              <Button type="button" onClick={nextStep} id="rightArrow2">
                <AiFillCaretRight />
              </Button>
            </CardFooter>
          </div>
        </div>
      </form>
      <div className="flex flex-col space-y-4">
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

export { PassengerForm };
