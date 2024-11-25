import MainText from '@/components/atoms/MainText/index';

type TotalPriceProps = {
  id: string;
  total: number;
}

const index = ({ id, total }: TotalPriceProps) => {
  return (
    <div className='flex justify-between bg-primary rounded-b-[6px] w-full h-16 p-5'>
      <MainText id={id} text='Total' color='text-white'/>
      <MainText id="total-price-number" text={`$${total}COP`} color='text-white'/>
    </div>
  )
}

export default index