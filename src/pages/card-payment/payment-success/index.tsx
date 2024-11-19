"use client";

import AlertMessage from "@/components/molecules/AlertMessage";
import ModalAlert from "@/components/templates/ModalAlert";
import { useRouter } from 'next/navigation'

const PaymentSucces = () => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/'); 
  };

  return (
    <div>
      <ModalAlert id="modal-alert" modalState={true} onClose={() => goToHomePage() } >
        <AlertMessage idText="successfull-buy" idTitle="successfull-buy-title" title="Compra exitosa" text="Disfruta tu viaje, gracias por confiar en nosotros" ></AlertMessage>
      </ModalAlert>
    </div>
  )
}

export default PaymentSucces
