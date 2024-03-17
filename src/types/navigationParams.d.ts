import { TravellerData } from "./flightData";

export type RootStackParamList = {
    Search: undefined;
    Flights: {
        toAirport: string
        fromAirport: string
        departureDate: string
        arrivalDate: string
        travellerData: TravellerData

    } | undefined
};