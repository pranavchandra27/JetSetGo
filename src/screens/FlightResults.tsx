import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {fetchFlights} from '../services/flightService';
import {FlightData} from '../types/flightData';
import {RootStackParamList} from '../types/navigationParams';
import FlightCard from '../components/FlightCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Flights'>;

const FlightResults = ({navigation, route}: Props) => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('priceAsc');

  const flightResult = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Results',
      headerTitleStyle: {fontWeight: 'bold'},
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    const loadFlights = async () => {
      setLoading(true);
      const data = await fetchFlights();
      setFlights(data);
      setLoading(false);
    };

    loadFlights();
  }, []);

  const getFilteredAndSortedFlights = () => {
    let filteredFlights = flights;
    if (filter !== 'All') {
      filteredFlights = flights.filter(flight => flight.airline === filter);
    }

    return filteredFlights.sort((a, b) => {
      if (sort === 'priceAsc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };

  if (loading) {
    return (
      <ActivityIndicator style={{marginTop: 40}} size="large" color="#003366" />
    );
  }

  const renderTravellerInfo = () => {
    let info = '';
    if (flightResult?.travellerData.adults) {
      info +=
        flightResult?.travellerData.adults > 0
          ? `| ${flightResult?.travellerData.adults} ${
              flightResult?.travellerData.adults > 1 ? 'Adult' : 'Adults'
            }`
          : '';
    }

    if (flightResult?.travellerData.children) {
      info +=
        flightResult?.travellerData.children > 0
          ? `| ${flightResult?.travellerData.children} Children`
          : '';
    }

    if (flightResult?.travellerData.infants) {
      info +=
        flightResult?.travellerData.infants > 0
          ? `| ${flightResult?.travellerData.infants} ${
              flightResult?.travellerData.infants > 1 ? 'Infant' : 'Infants'
            }`
          : '';
    }

    return info;
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>
          {flightResult?.fromAirport} - {flightResult?.toAirport}
        </Text>
        <Text style={styles.secondaryText}>
          {flightResult?.departureDate.split('-')[0]} {renderTravellerInfo()} |{' '}
          {flightResult?.travellerData.classType}
        </Text>
      </View>

      <Picker
        style={styles.picker}
        selectedValue={filter}
        dropdownIconColor={'#5a5a5a'}
        onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}>
        <Picker.Item label="All Airlines" value="All" />

        {flights.map((flight, index) => (
          <Picker.Item
            key={index}
            label={flight.airline}
            value={flight.airline}
          />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={sort}
        dropdownIconColor={'#5a5a5a'}
        onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
        <Picker.Item label="Cheapest first" value="priceAsc" />
        <Picker.Item label="Highest first" value="priceDesc" />
      </Picker>
      <FlatList
        style={styles.listContainer}
        data={getFilteredAndSortedFlights()}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <FlightCard flight={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 5,
    paddingHorizontal: 14,
    backgroundColor: '#eaeaea', // Light grey background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },

  primaryText: {
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
  },
  secondaryText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6a6a6a',
  },
  picker: {
    color: '#5a5a5a',
    backgroundColor: '#fafafa',
  },
  listContainer: {
    paddingTop: 10,
    marginBottom: 10,
  },
});

export default FlightResults;
