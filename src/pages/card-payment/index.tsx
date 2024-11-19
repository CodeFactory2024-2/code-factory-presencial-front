"use client";

import MainButton from "@/components/atoms/MainButton";
import SecundaryButton from "@/components/atoms/SecundaryButton";
import { MainTitle } from "@/components/atoms/Title";
import PaymentMethod from "@/components/molecules/PaymentMethod";
import Link from "next/link";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import ModalAlert from "@/components/templates/ModalAlert";
import AlertMessage from "@/components/molecules/AlertMessage";

const Index = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalState, setModalState] = useState(false);

  const paymentMethods = [
    { id: 1, name: "Bancolombia ****0000", value: "pse" },
  ];

  const router = useRouter();

  const goToSucces = () => {
    if (selectedId === null) {
      setModalState(true);
    } else if (selectedId){
      router.push('/card-payment/payment-success'); 
    }
  };

  const handleSelection = (id: number) => setSelectedId(id);


  return (
    <main className="w-[500px] mx-auto bg-white shadow-xl mt-6 py-10 px-8 rounded-[6px]">
      <div className="flex justify-between items-center">
        <MainTitle text="Pagar débito o crédito" />
        <IoAddCircleOutline className="text-3xl" />
      </div>
      <div className="w-full relative border mt-6 rounded-[6px] flex flex-col justify-center items-center">
        <p className="absolute top-2 left-2">Tus tarjetas</p>
        <div className="relative h-2/3 w-full px-4 my-10">
          {paymentMethods ? (
            paymentMethods.map((method) => (
              <PaymentMethod
                key={method.id}
                id={method.id}
                name={method.name}
                value={method.value}
                selected={selectedId === method.id}
                onSelect={() => handleSelection(method.id)}
              >
                <FaRegTrashAlt className="text-2xl absolute right-10" />
              </PaymentMethod>
            ))
          ) : (
            <p>No hay tarjetas</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Link href="/">
          <SecundaryButton id="id-home-page-button" text="Regresar" handleClick={() => {}} />
        </Link>
        <MainButton id="id-pay-button" text="Pagar" handleClick={() => goToSucces()} />
      </div>
      <ModalAlert modalState={modalState} onClose={() => setModalState(false)}>
        <AlertMessage
          title="Lo sentimos"
          text="Por favor selecciona tarjeta antes de continuar."
          
        />
      </ModalAlert>
    </main>
  );
};

export default Index;
