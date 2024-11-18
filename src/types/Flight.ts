export type Flight = {
    origin: string,
    destination: string,
    departureDate: string,
    arrivalDate?: string,
    departureTime: string,
    arrivalTime: string,
    flightClass: string,
    flightCode: string,
    passengers: number,
    price: number
}