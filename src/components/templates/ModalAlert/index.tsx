import MainButton from "@/components/atoms/MainButton/index";

type ModalProps = {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  modalState: boolean;
}

const Modal = ({ id, children, onClose, modalState }: ModalProps) => {
  return (
    <>
      {modalState ? (
        <div id={id} className="fixed z-1000 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3">
          <div className="bg-white p-12 rounded-[6px]">
            {children}
            <div className="flex justify-end">
              <MainButton
                id="id-closeModal" 
                text="Regresar" 
                handleClick={onClose} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
