import MainText from "@/components/atoms/MainText/index";

type PaymentMethodProps = {
  id: number;
  name: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
};

const PaymentMethod = ({
  id,
  name,
  value,
  selected,
  onSelect,
  children
}: PaymentMethodProps) => {
  return (
    <label
      onClick={onSelect}
      className={`flex justify-start items-center p-5 mt-3 rounded-[6px] shadow-lg cursor-pointer transition-all duration-300 
        ${selected ? "bg-primary border-primary" : "bg-white"}`}
    >
      <input
        id={`${id}`}
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selected}
        onChange={() => {}}
        className="mr-3 hidden"
      />
      <MainText id={name} text={name} color={selected ? "text-white" : "text-black"} />
      {children}
    </label>
  );
};

export default PaymentMethod;
