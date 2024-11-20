import MainText from "@/components/atoms/MainText/index";
import { MainTitle, SecondaryTitle } from "@/components/atoms/Title/index";
import Accordion from "@/components/molecules/Accordion";

interface ModalDetailsProps {
  origin: {
    city: string;
    country: string;
    code: string;
    airport: string;
    timeInFLy: string;
    departureDate: string;
    departureTime: string;
  };
  destination: {
    city: string;
    country: string;
    code: string;
    airport: string;
    arrivalDate: string;
    arrivalTime: string;
  };
  originBack?: {
    city: string;
    country: string;
    code: string;
    airport: string;
    timeInFLy: string;
    departureDate: string;
    departureTime: string;
  };
  destinationBack?: {
    city: string;
    country: string;
    code: string;
    airport: string;
    arrivalDate: string;
    arrivalTime: string;
  };
  adultsNumber: number;
  childrenNumber: number;
  goBack: boolean;
  flyNumber: string;
}

const accordionItems = [
  { item: "Adultos", value: "3" },
  { item: "Niños", value: "1" },
];

const ModalDetails: React.FC<ModalDetailsProps> = ({
  origin,
  destination,
  originBack,
  destinationBack,
  adultsNumber,
  childrenNumber,
  goBack,
  flyNumber,
}) => {
  return (
    <>
      {!goBack ? (
        <div className="w-full flight-details flex gap-36">
          <div className="flex flex-col gap-5">
            <div>
              <MainText id="origin" text="Origen" weight="700" />
              <div>
                <MainText
                  id="origin-city-country-code"
                  text={`${origin.city} - ${origin.country} ${origin.code}`}
                  color="text-slate-500"
                />
                <MainText id="origin-departure-date" text={origin.departureDate} color="text-slate-500" />
              </div>
            </div>
            <div>
              <MainText id="origin-leave-time" text="Hora de Salida" weight="700" />
              <MainText id="origin-departure-time" text={origin.departureTime} color="text-slate-500" />
            </div>
            <div>
              <MainText id="origin-adults" text="Adultos" weight="700" />
              <MainText id="origin-adults-number" text={`${adultsNumber}`} color="text-slate-500" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <MainText id="destiny" text="Destino" weight="700" />
              <div>
                <MainText
                  id="destiny-city-country-code"
                  text={`${destination.city} - ${destination.country} ${destination.code}`}
                  color="text-slate-500"
                />
                <MainText
                  id="destiny-arrival-date"
                  text={destination.arrivalDate}
                  color="text-slate-500"
                />
              </div>
            </div>
            <div>
              <MainText id="destination-arrival-time" text="Hora de Llegada" weight="700" />
              <MainText id="destination-arrival-time-number" text={destination.arrivalTime} color="text-slate-500" />
            </div>
            <div>
              <MainText id="children" text="Niños:" weight="700" />
              <MainText id="children-number" text={`${childrenNumber}`} color="text-slate-500" />
            </div>
          </div>
        </div>
      ) : (
        goBack &&
        originBack &&
        destinationBack && (
          <div className="flex">
            <div className="flight-details flex flex-col gap-3">
              <div className="flex flex-col mb-6">
                <MainTitle id="origin-departure" text="Ida" />
                <MainText id="origin-departure-date" text={origin.departureDate} color="text-slate-500" />
              </div>
              <div className="flex">
                <div className="flex flex-col gap-5 mr-10">
                  <div>
                    <SecondaryTitle id="origin" text="Origen" />
                    <MainText
                      id="origin-code"
                      text={origin.code}
                      color="text-slate-500"
                      weight="bold"
                    />
                    <MainText
                      id="origin-city-country"
                      text={`${origin.city} - ${origin.country}`}
                      color="text-slate-500"
                    />
                    <MainText
                      id="origin-airport"
                      text={`${origin.airport}`}
                      color="text-slate-500"
                    />
                  </div>
                  <div>
                    <SecondaryTitle id="origin-departure-tiem" text="Hora de Salida" />
                    <MainText
                      id="origin-departure-time"
                      text={origin.departureTime}
                      color="text-slate-500"
                      weight="bold"
                    />
                  </div>
                  <div>
                    <SecondaryTitle id="origin-time-in-fly" text="Duración" />
                    <MainText
                      id="origin-time-in-fly-data"
                      text={origin.timeInFLy}
                      color="text-slate-500"
                      weight="bold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <SecondaryTitle id="destiny" text="Destino" />
                    <MainText
                      id="destination-code"
                      text={destination.code}
                      color="text-slate-500"
                      weight="bold"
                    />
                    <MainText
                      id="destination-city-country"
                      text={`${destination.city} - ${destination.country}`}
                      color="text-slate-500"
                    />
                    <MainText
                      id="destination-airport"
                      text={`${destination.airport}`}
                      color="text-slate-500"
                    />
                  </div>
                  <div>
                    <SecondaryTitle id="destiny-arrival-time" text="Hora de Llegada" />
                    <MainText
                      id="destination-arrival-timenumber"
                      text={destination.arrivalTime}
                      color="text-slate-500"
                      weight="bold"
                    />
                  </div>
                  <div>
                    <SecondaryTitle id="fly-number" text="Número de vuelo" />
                    <MainText
                      id="fly-number-data"
                      text={flyNumber}
                      color="text-slate-500"
                      weight="bold"
                    />
                  </div>
                </div>
              </div>
              <Accordion
                id="passengers"
                textTitle="Pasaeros"
                bodyItems={accordionItems}
                itemsBetween={false}
              />
            </div>
            <div className=" border border-slate-200 mx-10"></div>
            <div>
              <div className="w-full flight-details flex flex-col gap-3">
                <div className="flex flex-col mb-6">
                  <MainTitle id="origin-back-departure-date" text="Regreso" />
                  <MainText
                    id="origin-back-departure-date-data"
                    text={originBack.departureDate}
                    color="text-slate-500"
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-5 mr-10">
                    <div>
                      <SecondaryTitle id="origin-text" text="Origen" />
                      <MainText
                        id="origin-back-code"
                        text={originBack.code}
                        color="text-slate-500"
                        weight="bold"
                      />
                      <MainText
                        id="origin-back-city-country"
                        text={`${originBack.city} - ${originBack.country}`}
                        color="text-slate-500"
                      />
                      <MainText
                        id="origin-back-airport"
                        text={`${originBack.airport}`}
                        color="text-slate-500"
                      />
                    </div>
                    <div>
                      <SecondaryTitle id="origin-back-departure-time" text="Hora de Salida" />
                      <MainText
                        id="origin-back-departure-time-data"
                        text={originBack.departureTime}
                        color="text-slate-500"
                        weight="bold"
                      />
                    </div>
                    <div>
                      <SecondaryTitle id="origin-back-time-in-fly" text="Duración" />
                      <MainText
                        id="origin-back-time-in-fly-data"
                        text={originBack.timeInFLy}
                        color="text-slate-500"
                        weight="bold"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <SecondaryTitle id="destiny-back" text="Destino" />
                      <MainText
                        id="destination-back-code"
                        text={destinationBack.code}
                        color="text-slate-500"
                        weight="bold"
                      />
                      <MainText
                        id="destination-back-city-country"
                        text={`${destinationBack.city} - ${destinationBack.country}`}
                        color="text-slate-500"
                      />
                      <MainText
                        id="destination-back-airport"
                        text={`${destinationBack.airport}`}
                        color="text-slate-500"
                      />
                    </div>
                    <div>
                      <SecondaryTitle id="destination-back-arrival-time" text="Hora de Llegada" />
                      <MainText
                        id="destination-back-arrival-time-number"
                        text={destinationBack.arrivalTime}
                        color="text-slate-500"
                        weight="bold"
                      />
                    </div>
                    <div>
                      <SecondaryTitle id="fly-number-back" text="Número de vuelo" />
                      <MainText
                        id="fly-number-data-bakc"
                        text={flyNumber}
                        color="text-slate-500"
                        weight="bold"
                      />
                    </div>
                  </div>
                </div>
                <Accordion
                  id="passengers-back"
                  textTitle="Pasajeros"
                  bodyItems={accordionItems}
                  itemsBetween={false}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ModalDetails;
