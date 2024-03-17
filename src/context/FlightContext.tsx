import React, {createContext, useContext, useEffect, useState} from 'react';

import {FlightData} from '../types/flightData';
import {fetchFlights} from '../services/flightService';

const FlightContext = createContext<{flights: FlightData[]}>({flights: []});

interface Props {
  children: React.ReactNode;
}

const FlightProvider: React.FC<Props> = ({children}) => {
  const [flights, setFlights] = useState<FlightData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchFlights();
      setFlights(data);
    })();
  }, []);

  return (
    <FlightContext.Provider value={{flights}}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightData = () => useContext(FlightContext);

export default FlightProvider;
