import { AllReservationsPassenger } from "@/types/booking"
import { TableCell, TableRow } from "../../table"
import { BsFillTrashFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { DELETE_RESERVATION_PASSENGER } from "@/graphql/mutation/reservation";
import Swal from "sweetalert2";
import { useState } from "react";
import { DeleteDialog } from "./DeleteDialog";
import Link from "next/link";
import Tooltip from '@mui/material/Tooltip';




const ReservationTable = ({
    reservation,
    refetch
}:
    {
        reservation: AllReservationsPassenger,
        refetch: () => void
    }) => {

    const [deleteReservationPassenger] = useMutation(DELETE_RESERVATION_PASSENGER)
    const [openDelete, setOpenDelete] = useState(false)

    const handleClose = () => {
        setOpenDelete(false)
    }

    const handleDeleteReservationPassenger = async () => {
        try {
            const result = await deleteReservationPassenger({
                variables: {
                    id: reservation.id
                }
            })
            console.log(result)
            if (result.data) {
                Swal.fire({
                    icon: 'success',
                    title: `${result.data.deleteReservationPassenger}`,
                })
            }
        } catch (error) {
            console.log(error)
        }
        setOpenDelete(false)
        refetch()
    }

    const getFormattedDate = (date: Date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    return (
        <>
            <TableRow key={reservation.id}>
                <TableCell>{reservation.passenger.name} {reservation.passenger.lastName}</TableCell>
                <TableCell>{reservation.reservation.flight.origin}</TableCell>
                <TableCell>{reservation.reservation.flight.destination}</TableCell>
                <TableCell>{reservation.reservation.flight.flightNumber}</TableCell>
                <TableCell>{getFormattedDate(reservation.reservationTime)}</TableCell>
                <TableCell>{reservation.seatNumber}</TableCell>
                <TableCell>{reservation.reservation.reservationCode}</TableCell>
                <TableCell className="flex items-center space-x-8">
                    <Tooltip title="Ver detalles" placement="bottom">
                        <Link
                            href={{
                                pathname: '/reservasa/all/[id]',
                                query: { id: reservation.id }
                            }}
                            className="hover:text-sky-800 text-xl text-sky-500">
                            <BsSearch />
                        </Link>
                    </Tooltip>

                    <Tooltip title="Eliminar" placement="bottom">
                        <button onClick={() => setOpenDelete(true)}>
                            <BsFillTrashFill className="hover:text-red-800  text-xl text-red-500" />
                        </button>
                    </Tooltip>
                </TableCell>
            </TableRow>

            <DeleteDialog openDelete={openDelete} handleClose={handleClose} handleDelete={handleDeleteReservationPassenger} />

        </>
    )
}

export default ReservationTable