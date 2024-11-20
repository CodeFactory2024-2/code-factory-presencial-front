"use client";

import SecundaryButton from "@/components/atoms/SecundaryButton";
import { MainTitle } from "@/components/atoms/Title";
import Link from "next/link";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ModalAlert from "@/components/templates/ModalAlert";
import AlertMessage from "@/components/molecules/AlertMessage";
import InputSelect from "@/components/atoms/InputSelect/index";
import InputText from "@/components/atoms/InputText/index";

const Index = () => {
  const [modalState, setModalState] = useState(false);

  const [userName, setUserName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");


  const router = useRouter();

  const goToSucces = (e: React.FormEvent) => {

    e.preventDefault();

    if (!userName ||
      !cardNumber ||
      !expirationMonth ||
      !expirationYear ||
      !cvv) {
      setModalState(true);
    } else {
      router.push("/card-payment/payment-success");
    }
  };

  return (
    <main className="w-[500px] mx-auto bg-white shadow-xl mt-6 py-10 px-8 rounded-[6px]">
      <div className="flex justify-between items-center">
        <MainTitle
          id="buy-with-debit-or-credit"
          text="Pagar débito o crédito"
        />
        <IoAddCircleOutline className="text-3xl" />
      </div>
      <div className="w-full relative border mt-6 rounded-[6px] flex flex-col justify-center items-center">
        <div className="relative h-2/3 w-full px-4 my-10">
          <form>
            <InputText
              id="user-name"
              label="Nombre del titular"
              placeholder="NOMBRE APELLIDO"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            ></InputText>
            <InputText
              id="card-number"
              label="Número de la tarjeta"
              onChange={(e) => setCardNumber(e.target.value)}
              value={cardNumber}
              placeholder="XXXX-XXXX-XXXX-XXXX"
            ></InputText>
            <div>
              <p>Fecha de caducidad</p>
              <div className="w-full flex items-center">
                <InputSelect
                  id="expitation-month"
                  label=""
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  value={expirationMonth}
                  options={[
                    "Seleccionar...",
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                  ]}
                ></InputSelect>
                <span className="mx-2"></span>
                <InputSelect
                  id="expitation-year"
                  label=""
                  onChange={(e) => setExpirationYear(e.target.value)}
                  value={expirationYear}
                  options={["Seleccionar...", "2024", "2025", "2026", "2027", "2028"]}
                ></InputSelect>
              </div>
              <InputText
                id="cvv"
                label="CVV"
                onChange={(e) => setCvv(e.target.value)}
                value={cvv}
                placeholder="XXX"
              ></InputText>
            </div>
            <div className="w-full flex justify-end">
              <button
                id="id-pay-button"
                className="bg-primary text-white py-2 px-3 rounded-[6px]"
                onClick={(e) => goToSucces(e)}
                type="submit"
              >
                Pagar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Link href="/">
          <SecundaryButton
            id="id-home-page-button"
            text="Regresar"
            handleClick={() => {}}
          />
        </Link>
      </div>
      <ModalAlert
        id="modal-alert"
        modalState={modalState}
        onClose={() => setModalState(false)}
      >
        <AlertMessage
          idText="id-alert-message"
          idTitle="id-alert-title"
          title="Lo sentimos"
          text="Por favor llene todos los campos de la tarjeta antes de continuar."
        />
      </ModalAlert>
    </main>
  );
};

export default Index;
