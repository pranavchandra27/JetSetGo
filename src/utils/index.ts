import { FlightData } from "../types/flightData";

export const getAllCities = (flightData: FlightData[]): string[] => {
    if (!flightData || flightData.length === 0) return []
    const origins = flightData.map((d) => d.origin)
    const destinations = flightData.map((d) => d.destination);
    return [...new Set([...origins, ...destinations])]
}

export const getAllAirlines = (flightData: FlightData[]): string[] => {
    if (!flightData || flightData.length === 0) return []
    const airlines = flightData.map((d) => d.airline)
    return [...new Set(airlines)]
}

export const removeDuplicates = <T>(inputArray: T[], key: keyof T): T[] => {
    const seen = new Set();
    return inputArray.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

export const formatDate = (dateString: string): string => {
    const months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const date: Date = new Date(dateString);
    const day: number = date.getUTCDate();
    const month: string = months[date.getUTCMonth()];
    const year: number = date.getUTCFullYear();
    const dayOfWeek: string = days[date.getUTCDay()];

    return `${day} ${month} - ${dayOfWeek}, ${year}`;
}


export const formatAmount = (amount: number): string => {
    const amountString: string = amount.toString();
    const parts: string[] = amountString.split('.');
    let wholePart: string = parts[0];
    wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedAmount: string = parts.length > 1 ? wholePart + '.' + parts[1] : wholePart;

    return formattedAmount;
}
