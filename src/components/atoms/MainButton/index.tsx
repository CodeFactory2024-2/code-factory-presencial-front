type propsType = {
  id: string;
  text: string;
  handleClick: () => void;
};

const index = ({ text, handleClick, id }: propsType) => {
  return (
    <button
      id={id}
      className="bg-primary text-white py-2 px-3 rounded-[6px]"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default index;
