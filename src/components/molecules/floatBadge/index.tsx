import MainText from '../../atoms/MainText/index'

type FloatBadgeProps = {
  id: string;
  text: string;
}

const index = ({ id, text }: FloatBadgeProps) => {
  return (
    <div className='inline-block px-3 py-1 rounded-e-[6px] rounded-bl-[6px] border-2 border-primary'>
      <MainText id={id} text={`${text}`} />
    </div>
  )
}

export default index
