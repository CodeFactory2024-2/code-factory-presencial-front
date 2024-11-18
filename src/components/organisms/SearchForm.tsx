import React, { useMemo, useState } from 'react'
import { RadioGroup, RadioGroupItem} from '../ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { InputSearchField, InputSearchFieldCalendar, InputSearchFieldPassenger, } from '@/types/InputTypes'
import { SearchInputCalendar } from '../atoms/SearchInputCalendar'
import { Button } from '../ui/button'
import SearchCombobox from './SearchCombobox'
import { searchFieldsCombobox } from '@/constants/FormFields'
import SearchInputPassenger from '../atoms/SearchInputPassenger'
import { useRouter } from 'next/router';

type SearchFormProps = {
  inputFields: InputSearchField[],
  inputFieldsCalendar: InputSearchFieldCalendar[]
  InputSearchFieldPassenger: InputSearchFieldPassenger[]
}

export default function SearchForm( { inputFields, inputFieldsCalendar, InputSearchFieldPassenger }: SearchFormProps ) {

  const router = useRouter();

  const [tripType, setTripType] = useState<string | undefined>(); 
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TO DO: logica para enviar los datos al Backend
    router.push({
      pathname: '/BusquedaDeVuelosA/search',
      query: { ...searchParams, tripType }
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value === 'passengers' ? (parseInt(value, 10) || 1) : value
    });
  };

  const isValid = useMemo(() => {
    return searchParams.origin !== '' && searchParams.destination !== '' 
  }, [searchParams]);
  
  return (
    <form onSubmit={handleSubmit} className='flex w-auto xl:w-11/12 p-4 rounded-lg shadow-md border justify-around items-center gap-3'>
        <RadioGroup
          className="flex space-x-4"
          onValueChange={(value) => setTripType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundTrip" id="roundTrip" />
            <Label htmlFor="roundTrip" className='text-sm xl:text-base'> Ida y vuelta </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneWay" id="oneWay" />
            <Label htmlFor="oneWay" className='text-sm xl:text-base'> Solo ida </Label>
          </div>
        </RadioGroup>
        <div className='flex gap-3 xl:gap-10'>
          <SearchCombobox
            inputSearchField={inputFields}
            options={searchFieldsCombobox}
            handleInputChange={handleInputChange}
            originValue={searchParams.origin}
          />
          <SearchInputPassenger
            inputSearchField={InputSearchFieldPassenger}
            handleInputChange={handleInputChange}
          />
          <SearchInputCalendar 
            inputSearchField={inputFieldsCalendar}
            handleInputChange={handleInputChange}
          />
        </div>
        <Button 
          type="submit" 
          className="bg-primary lg:w-32 xl:w-52 h-10 text-white rounded-2xl p-2 disabled:opacity-30"
          disabled={!isValid}
        >
          Buscar
        </Button>
    </form>
  )
}
