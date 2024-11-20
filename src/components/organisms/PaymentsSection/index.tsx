"use client";

import { useState } from "react";
import PaymentMethod from "@/components/molecules/PaymentMethod/index";
import FloatBadge from "@/components/molecules/FloatBadge/index";
import MainButton from "@/components/atoms/MainButton/index";
import AlertMessage from "@/components/molecules/AlertMessage/index";
import ModalAlert from "@/components/templates/ModalAlert/index";
import Link from "next/link";

const Index = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalState, setModalState] = useState(false);

  const paymentMethods = [
    { id: 2, name: "Bancolombia", value: "bancolombia" },
    { id: 4, name: "PayPal", value: "paypal" },
    { id: 3, name: "Pay U", value: "pay_u" },
    { id: 1, name: "PSE", value: "pse" },
  ];

  const handleSelection = (id: number) => setSelectedId(id);

  const handleContinue = () => {
    if (selectedId === null) {
      setModalState(true);
    }
  };

  return (
    <div className="flex flex-col w-[500px] justify-center p-5">
      <ModalAlert id="alert-modal" modalState={modalState} onClose={() => setModalState(false)}>
        <AlertMessage
          idText="id-alert-message"
          idTitle="id-alert-title"
          title="Lo sentimos"
          text="Por favor selecciona un método de pago antes de continuar."
          
        />
      </ModalAlert>

      <div className="">
        <FloatBadge id="how-will-you-pay" text="¿Cómo vas a pagar?" />
        <form className="w-full max-w-md space-y-4 mt-5">
          {paymentMethods.map((method) => (
            <PaymentMethod
              key={method.id}
              id={method.id}
              name={method.name}
              value={method.value}
              selected={selectedId === method.id}
              onSelect={() => handleSelection(method.id)}
            />
          ))}
        </form>
      </div>

      <div className="mt-10">
        <FloatBadge id="another-payment-methods" text="Otros métodos de pago" />
        <form className="w-full max-w-md space-y-4 mt-5">
          <PaymentMethod
            id={5}
            name="Tarjeta de crédito o débito"
            value="credit_card"
            selected={selectedId === 5}
            onSelect={() => handleSelection(5)}
          />
        </form>
      </div>

      <div className="flex justify-end mt-10">
        <Link href={selectedId !== null ? "/card-payment" : "#"}>
          <MainButton
            id="id-continue-button"
            text="Continuar"
            handleClick={handleContinue}
          />
        </Link>
      </div>
    </div>
  );
};

export default Index;
