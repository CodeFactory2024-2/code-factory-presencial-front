import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const DeleteDialog = ({
    openDelete,
    handleClose,
    handleDelete,
    reservationId
}: {
    openDelete: boolean,
    handleClose: () => void,
    handleDelete: () => void,
    reservationId: string
}) => {
  return (
    <Dialog open={openDelete} onClose={handleClose} className="items-center justify-center bg-black bg-opacity-50">
    <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <DialogTitle className="text-xl font-semibold text-gray-800 mb-4 text-center">
            ¿Estás seguro de eliminar la reserva?
        </DialogTitle>
        <DialogActions className="flex justify-end space-x-4 mt-6">
            <button onClick={handleClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md">
                Cancelar
            </button>
            <button onClick={handleDelete}
            id={'confirmDelete' + reservationId} 
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                Eliminar
            </button>
        </DialogActions>
    </DialogContent>
</Dialog>
  )
}
