import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {RootStackParamList} from '../types/navigationParams';
import {useFlightData} from '../context/FlightContext';
import {formatDate, getAllCities} from '../utils';
import CityModal from '../components/CitySelectionModal';
import CalendarView from '../components/CalendarView';
import {TravellerData} from '../types/flightData';
import TravellerAndClass from '../components/TravellerAndClass';

type FlightSearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const FlightSearch = ({navigation}: FlightSearchProps) => {
  const {flights} = useFlightData();

  const [cityList, setCityList] = useState<string[]>([]);
  const [fromAirport, setFromAirport] = useState('Delhi');
  const [toAirport, setToAirport] = useState('Mumbai');
  const [departureDate, setDepartureDate] = useState(
    formatDate(
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split('T')[0],
    ),
  );
  const [arrivalDate, setArrivalDate] = useState('-');

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [travellerModalVisible, setTravellerModalVisible] = useState(false);
  const [modalType, setModalType] = useState('from');
  const [calendarModalType, setCalendarModalType] = useState('departure');
  const [travellerData, setTravellerClass] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    classType: 'economy',
  });

  useEffect(() => {
    setCityList(getAllCities(flights));
  }, [flights]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Jet Set Go',
      headerTitleStyle: {fontWeight: 'bold'},
      headerTitleAlign: 'center',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const onDaySelect = (day: string) => {
    if (calendarModalType === 'departure') {
      setDepartureDate(formatDate(day));
    } else {
      setArrivalDate(formatDate(day));
    }
    setCalendarModalVisible(false);
  };
  const onCityPress = (city: string) => {
    if (modalType === 'to') {
      setToAirport(city);
    } else {
      setFromAirport(city);
    }
    setCityModalVisible(false);
  };

  const onPressSearch = () => {
    if (toAirport.toLocaleLowerCase() === fromAirport.toLocaleLowerCase()) {
      Alert.alert('Departure and arrival cannot be same!');
    } else {
      navigation.navigate('Flights', {
        departureDate,
        arrivalDate,
        toAirport,
        fromAirport,
        travellerData,
      });
    }
  };

  return (
    <ScrollView style={[styles.container]}>
      <Text style={styles.mainHeading}>Book Your Flight</Text>

      <View style={styles.tripInfo}>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => {
              setCityModalVisible(true);
              setModalType('from');
            }}>
            <View style={styles.content}>
              <MaterialIcons name="airplane-takeoff" size={24} color={'#aaa'} />
              <View style={{marginStart: 10}}>
                <Text style={styles.header}>FROM</Text>
                <View style={styles.mainTextContainer}>
                  <Text style={styles.primaryText}>
                    {fromAirport || 'Select city'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => {
              setCityModalVisible(true);
              setModalType('to');
            }}>
            <View style={styles.content}>
              <MaterialIcons name="airplane-landing" size={24} color={'#aaa'} />
              <View style={{marginStart: 10}}>
                <Text style={styles.header}>TO</Text>
                <View style={styles.mainTextContainer}>
                  <Text style={styles.primaryText}>
                    {toAirport || 'Select city'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              onPress={() => {
                setCalendarModalType('departure');
                setCalendarModalVisible(true);
              }}>
              <View style={styles.content}>
                <MaterialIcons name="calendar" size={24} color={'#aaa'} />
                <View style={{marginStart: 10}}>
                  <Text style={styles.header}>DEPARTURE DATE</Text>
                  <View style={styles.mainTextContainer}>
                    <Text style={styles.primaryText}>
                      {departureDate.split(' - ')[0]}
                    </Text>
                    <Text style={styles.secondaryText}>
                      {departureDate.split(' - ')[1]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              onPress={() => {
                setCalendarModalType('arrival');
                setCalendarModalVisible(true);
              }}>
              <View style={styles.content}>
                <MaterialIcons name="calendar" size={24} color={'#aaa'} />
                <View style={{marginStart: 10}}>
                  <Text style={styles.header}>ARRIVAL DATE</Text>
                  <View style={styles.mainTextContainer}>
                    <Text style={styles.primaryText}>
                      {arrivalDate.split(' - ')[0]}
                    </Text>
                    <Text style={styles.secondaryText}>
                      {arrivalDate.split(' - ')[1]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={() => setTravellerModalVisible(true)}>
            <View style={styles.content}>
              <MaterialIcons name="account" size={24} color={'#aaa'} />
              <View style={{marginStart: 10}}>
                <Text style={styles.header}>TRAVELLER & CLASS</Text>
                <View style={styles.mainTextContainer}>
                  <Text style={styles.primaryText}>
                    {travellerData.adults +
                      travellerData.children +
                      travellerData.infants}
                  </Text>
                  <Text style={styles.secondaryText}>
                    {travellerData.classType.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <CityModal
        cityList={cityList}
        isOpen={cityModalVisible}
        type={modalType}
        close={() => setCityModalVisible(false)}
        onCityPress={onCityPress}
      />

      <CalendarView
        onDaySelect={onDaySelect}
        type={calendarModalType}
        isOpen={calendarModalVisible}
        close={() => setCalendarModalVisible(false)}
      />

      <TravellerAndClass
        travellerData={travellerData}
        isOpen={travellerModalVisible}
        close={() => setTravellerModalVisible(false)}
        pressDone={(data: TravellerData) => setTravellerClass(data)}
      />

      <View style={styles.submitButton}>
        <Button title="Search" onPress={onPressSearch}></Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingTop: '50%',
    paddingHorizontal: 14,
  },
  mainHeading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
  },

  infoContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    padding: 6,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 12,
    color: '#6a6a6a',
  },
  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  primaryText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '700',
  },
  secondaryText: {
    fontSize: 12,
    marginStart: 6,
    marginBottom: 2,
    color: '#6a6a6a',
  },
  subText: {
    fontSize: 12,
    color: '#6a6a6a',
  },
  tripInfo: {flex: 1, gap: 10},
  dateContainer: {flex: 1, gap: 10, flexDirection: 'row'},
  submitButton: {
    marginTop: 10,
  },
});

export default FlightSearch;
