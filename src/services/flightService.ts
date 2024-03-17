// flightService.ts
import axios from 'axios';

const API_URL = 'https://api.npoint.io/378e02e8e732bb1ac55b';

export const fetchFlights = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assuming the API returns the flight data directly
  } catch (error) {
    console.error('Failed to fetch flights:', error);
    return []; // Return an empty array in case of error
  }
};
