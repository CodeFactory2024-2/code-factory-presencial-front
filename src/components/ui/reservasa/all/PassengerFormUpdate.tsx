import { ReservationPassengerID } from "@/types/booking"
import { Input } from "../../input"
import { Button } from "../../button"
import { Passenger } from "@/types/passenger"
import { tipoDocumento } from "@/utils/tipoDocumento"
import { useMutation } from "@apollo/client"
import { UPDATE_PASSENGER } from "@/graphql/query/passenger"
import Swal from "sweetalert2"
import { countries } from "@/utils/country"

export const PassengerFormUpdate = ({
    booking
}: {
    booking: ReservationPassengerID
}) => {

    const [updatePassenger] = useMutation(UPDATE_PASSENGER);
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const updatedPassenger: Passenger = {
            name: data.name as string,
            lastName: data.lastName as string,
            typeDni: data.typeDni as string,
            dni: data.dni as string,
            age: parseInt(data.age as string),
            email: data.email as string,
            phone: data.phone as string,
            nationality: data.nationality as string,
        }
        console.log(updatedPassenger)
        const result = await updatePassenger({
            variables: {
                id: booking.reservationPassengerById.passenger.id,
                passengerInput: updatedPassenger
            }
        })

        if (result.data) {
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Pasajero actualizado',
                text: `El pasajero ${result.data.updatePassenger.name} ${result.data.updatePassenger.lastName} ha sido actualizado correctamente`
            })
        }
    }

    //delete from tipoDocumento the type of document that the passenger already has
    const documentTypes = tipoDocumento.filter(
        (tipo) => tipo !== booking.reservationPassengerById.passenger?.typeDni
    )

    //delete from countries the nationality that the passenger already has
    const countriesFiltered = countries.filter(
        (country) => country !== booking.reservationPassengerById.passenger?.nationality
    )


    return (
        <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdate}>
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Nombre</label>
                    <Input
                        type="text"
                        name="name"
                        required
                        className="w-full rounded-md"
                        defaultValue={booking.reservationPassengerById.passenger?.name}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Apellido</label>
                    <Input
                        id="lastName-update"
                        type="text"
                        name="lastName"
                        required
                        className="w-full rounded-md"
                        defaultValue={booking.reservationPassengerById.passenger?.lastName}
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Email</label>
                    <Input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-md"
                        defaultValue={booking.reservationPassengerById.passenger?.email}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Teléfono</label>
                    <Input
                        type="tel"
                        name="phone"
                        required
                        className="w-full rounded-md"
                        defaultValue={booking.reservationPassengerById.passenger?.phone}
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Edad</label>
                    <Input
                        type="number"
                        name="age"
                        required
                        className="w-full rounded-md"
                        defaultValue={booking.reservationPassengerById.passenger?.age}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Tipo de documento</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        name="typeDni"
                        required
                    >
                        <option value={booking.reservationPassengerById.passenger?.typeDni}>{booking.reservationPassengerById.passenger?.typeDni}</option>
                        {documentTypes.map((tipo) => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex justify-between'>

                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Documento</label>
                    <Input
                        type="text"
                        name="dni"
                        className="w-full rounded-md"
                        required
                        defaultValue={booking.reservationPassengerById.passenger?.dni}
                    />
                </div>
                <div className="flex flex-col justify-end w-1/2">
                    <label className="text-gray-700 font-semibold mb-1">Nacionalidad</label>
                    <select
                        className="p-2 border border-gray-300 rounded-md"
                        required
                        name="nationality"
                    >
                        <option value={booking.reservationPassengerById.passenger?.nationality}>{booking.reservationPassengerById.passenger?.nationality}</option>
                        {countriesFiltered.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>

                        ))}

                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    type="submit"
                    id="confirmUpdate"
                    className="w-fit">Confirmar edición</Button>
            </div>
        </form>
    )
}
