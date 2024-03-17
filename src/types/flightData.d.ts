export interface FlightData {
    aircraft: string;
    airline: string;
    arrivalTime: string;
    departureTime: string;
    destination: string;
    duration: string;
    flightNumber: string;
    gate: string;
    id: number;
    origin: string;
    price: number;
    seatsAvailable: number;
}

export interface TravellerData {
    adults: number;
    children: number;
    infants: number;
    classType: string;
}