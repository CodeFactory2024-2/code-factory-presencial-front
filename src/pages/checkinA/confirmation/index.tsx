import { useState } from "react";

import { FormData } from "@/types/checkinA/Form";
import { TitlePrincipal } from "@/components/checkinA/Titles";
import { Sidebar } from "@/components/checkinA/Sidebar";
import { PersonalDataForm } from "@/components/checkinA/CheckinForms/PersonalDataForm";
import { EmergencyContactForm } from "@/components/checkinA/CheckinForms/EmergencyContactForm";
import { DocumentsForm } from "@/components/checkinA/CheckinForms/DocumentsForm";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useCheckinAContext } from "@/context/CheckinAContext";

// Dato para testear
const NUMBER_OF_PASSENGERS = 2;

const formSchema = z.object({
  fullName: z.string().min(1, "El nombre es obligatorio"),
  birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
  nationality: z.string().min(1, "La nacionalidad es obligatoria"),
  baggageAddress: z.string().min(1, "La dirección de equipaje es obligatoria"),
  autoBaggageAddress: z.boolean(),
  health: z.string().min(1, "La información de salud es obligatoria"),
  travel: z.string().min(1, "La información de viaje es obligatoria"),
  document: z.string().min(1, "El documento es obligatorio"),
  contactName: z.string().min(1, "El nombre del contacto es obligatorio"),
  contactPhone: z.string().min(1, "El teléfono del contacto es obligatorio"),
  contactRelationship: z
    .string()
    .min(1, "La relación con el contacto es obligatoria"),
  contactAddress: z.string().min(1, "La dirección de contacto es obligatoria"),
  autoContactAddress: z.boolean(),
});

export default function Confirmation() {
  const [section, setSection] = useState(0);
  const [currentPassenger, setCurrentPassenger] = useState(1);
  const [passengersData, setPassengersData] = useState<FormData[]>([]);

  const { addPassenger } = useCheckinAContext();

  let firstPassengerData;

  if (passengersData.length > 0) {
    firstPassengerData = passengersData[0];
  }

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      nationality: "",
      baggageAddress: "",
      autoBaggageAddress: false,
      health: "",
      travel: "",
      document: "",
      contactName: "",
      contactPhone: "",
      contactRelationship: "",
      contactAddress: "",
      autoContactAddress: false,
    },
  });

  const handleNextSection = () => {
    setSection(section + 1);
  };

  const handlePreviousSection = () => {
    setSection(section - 1);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setPassengersData((prevData) => [...prevData, values]);
    addPassenger(values);
    form.reset();
    setSection(0);
    setCurrentPassenger(currentPassenger + 1);
  };

  if (currentPassenger > NUMBER_OF_PASSENGERS) {
    router.push("/checkinA/boardingCard");
    console.log(passengersData);
  }

  return (
    <div className="flex flex-col h-screen p-4 max-w-5xl mx-auto">
      <TitlePrincipal title="Confirma los datos para tu vuelo" />
      <p className="text-xl">Pasajero {currentPassenger}</p>

      <div className="flex gap-4 h-full mt-8">
        <Sidebar section={section} onSection={setSection} />

        {section === 0 && (
          <PersonalDataForm
            form={form}
            onNextSection={handleNextSection}
            firstPassengerData={firstPassengerData}
            currentPassenger={currentPassenger}
          />
        )}

        {section === 1 && (
          <EmergencyContactForm
            form={form}
            onNextSection={handleNextSection}
            onPreviousSection={handlePreviousSection}
            onSubmit={handleSubmit}
            firstPassengerData={firstPassengerData}
            currentPassenger={currentPassenger}
          />
        )}

        {section === 2 && (
          <DocumentsForm
            form={form}
            onPreviousSection={handlePreviousSection}
            onSubmit={handleSubmit}
            currentPassenger={currentPassenger}
          />
        )}
      </div>
    </div>
  );
}
