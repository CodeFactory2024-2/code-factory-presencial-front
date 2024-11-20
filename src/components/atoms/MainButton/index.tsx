type propsType = {
  id: string;
  text: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
};

const index = ({ text, handleClick, id, type = "button" }: propsType) => {
  return (
    <button
      id={id}
      className="bg-primary text-white py-2 px-3 rounded-[6px]"
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default index;
