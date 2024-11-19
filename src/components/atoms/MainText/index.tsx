type mainTextProps = {
  id: string;
  text: string;
  color?: string;
  weight?: string;
};

const index = ({ text, color = "text-black", weight = "500", id }: mainTextProps) => {
  return <p id={id} className={`${color} font-[${weight}]`}>{text}</p>;
};

export default index;
