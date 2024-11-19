type titleProps = {
  id: string;
  text: string;
}

const MainTitle = ({ id, text }: titleProps) => {
  return <h2 id={id} className="text-2xl font-semibold">{text}</h2>;
};

const SecondaryTitle = ({ id, text }: titleProps) => {
  return <h3 id={id} className="text-xl font-semibold">{text}</h3>;
};

export { MainTitle, SecondaryTitle };
