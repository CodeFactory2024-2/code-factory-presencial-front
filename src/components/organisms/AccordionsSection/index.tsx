import Accordion from '@/components/molecules/Accordion/index'

const index = () => {
  
  const feeFly = [{id:"fee-fly", item: "Tarifa del vuelo", value: "165.800COP"}];
  const chargesFly = [{id:"charges-fly", item: "Cargos adicionales", value: "0.00COP"}];
  const taxesFly = [{id:"taxes-fly", item: "Impuestos", value: "77.608COP"}];
  
  return (
    <div className='w-full'>
      <Accordion id="id-fee-fly-accordion" bodyItems={feeFly} textTitle='Tarifa del Vuelo' priceTitle='165.800COP' ></Accordion>
      <Accordion id="id-charges-fly-accordion" bodyItems={chargesFly} textTitle='Cargos adicionales' priceTitle='0.00COP' ></Accordion>
      <Accordion id="id-taxes-fly-accordion" bodyItems={taxesFly} textTitle='Impuestos' priceTitle='77.608COP' ></Accordion>
    </div>
  )
}

export default index
