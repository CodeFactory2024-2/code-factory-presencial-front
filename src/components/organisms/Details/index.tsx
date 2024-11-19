import MainText from "@/components/atoms/MainText/index";
import { MainTitle } from "@/components/atoms/Title/index";

interface DetailsProps {
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
}

const index: React.FC<DetailsProps> = ({
  origin,
  destination,
  originBack,
  destinationBack,
  adultsNumber,
  childrenNumber,
  goBack,
}) => {
  return (
    <>
      {!goBack ? (
        <div className="w-full flight-details flex gap-36">
          <div className="flex flex-col gap-5">
            <div>
              <MainText id='origin' text="Origen" weight="700" />
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
              <MainText id="leave-time" text="Hora de Salida" weight="700" />
              <MainText id="leave-time-number" text={origin.departureTime} color="text-slate-500" />
            </div>
            <div>
              <MainText id="adults" text="Adultos" weight="700" />
              <MainText id="adults-number" text={`${adultsNumber}`} color="text-slate-500" />
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
                  id="destinarion-arrival-date"
                  text={destination.arrivalDate}
                  color="text-slate-500"
                />
              </div>
            </div>
            <div>
              <MainText id="arrival-time" text="Hora de Llegada" weight="700" />
              <MainText id="arrival-time-number" text={destination.arrivalTime} color="text-slate-500" />
            </div>
            <div>
              <MainText id="children" text="Niños:" weight="700" />
              <MainText id="children-number" text={`${childrenNumber}`} color="text-slate-500" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flight-details flex flex-col">
          <div className="flex items-end gap-3">
            <MainTitle id="go" text="Ida" />
            <div className="flex gap-1">
              <MainText id="origin-departure-date" text={origin.departureDate} color="text-slate-500" />
              <span>-</span>
              <MainText id="origin-departure-time" text={origin.departureTime} color="text-slate-500" />
            </div>
          </div>
          <div className="flex justify-between gap-32 px-4">
            <div>
              <MainText id="origin" text="Origen" weight="700" />
              <MainText
                id={`${origin.city}-${origin.country}-${origin.code}`}
                text={`${origin.city} - ${origin.country} ${origin.code}`}
                color="text-slate-500"
              />
            </div>
            <div>
              <MainText id="destiny" text="Destino" weight="700" />
              <MainText
                id="destiny-city-country-code"
                text={`${destination.city} - ${destination.country} ${destination.code}`}
                color="text-slate-500"
              />
            </div>
          </div>

          {/* ---- Regreso ---- */}
          {goBack && originBack && destinationBack && (
            <>
              <div className="flex items-end gap-3 mt-8">
                <MainTitle id="back" text="Regreso" />
                <div className="flex gap-1">
                  <MainText
                    id="origin-back-departure-date"
                    text={originBack.departureDate}
                    color="text-slate-500"
                  />
                  <span>-</span>
                  <MainText
                    id="origin-back-departure-time"
                    text={originBack.departureTime}
                    color="text-slate-500"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-32 px-4">
                <div>
                  <MainText id="origin-back" text="Origen" weight="700" />
                  <MainText
                    id="origin-back-city"
                    text={`${originBack.city} - ${originBack.country} ${originBack.code}`}
                    color="text-slate-500"
                  />
                </div>
                <div>
                  <MainText id="destiny-back" text="Destino" weight="700" />
                  <MainText
                    id="destiny-back-city"
                    text={`${destinationBack.city} - ${destinationBack.country} ${destinationBack.code}`}
                    color="text-slate-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default index;
