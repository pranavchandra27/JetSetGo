import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FlightData} from '../types/flightData';
import {formatAmount} from '../utils';

// Reference data
//  {
//    "aircraft": "Boeing 787",
//    "airline": "Air India",
//    "arrivalTime": "2024-03-15T20:30:00",
//    "departureTime": "2024-03-15T17:00:00",
//    "destination": "Kolkata",
//    "duration": "3 hours 30 minutes",
//    "flightNumber": "AI230",
//    "gate": "D10",
//    "id": 20,
//    "origin": "Bangalore",
//    "price": 6200,
//    "seatsAvailable": 110
//  }

type FlightCardProps = {
  flight: FlightData;
};

const FlightCard = ({flight}: FlightCardProps) => {
  const departureTime = new Date(flight.departureTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const arrivalTime = new Date(flight.arrivalTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.airlineText}>
            {flight.airline}, {flight.aircraft}
          </Text>

          <Text style={styles.gateText}>Gate | {flight.gate}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{departureTime}</Text>
          <Text style={styles.durationText}>{flight.duration}</Text>
          <Text style={styles.timeText}>{arrivalTime}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.priceText}>₹ {formatAmount(flight.price)}</Text>
          <Text style={styles.perUser}>per adult</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  details: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  airlineText: {
    fontWeight: 'bold',
    color: '#333',
  },
  gateText: {
    color: '#555',
    fontSize: 12,
  },
  timeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  perUser: {
    fontSize: 12,
    marginStart: 5,
    marginBottom: 2,
    color: '#aaa',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FlightCard;
