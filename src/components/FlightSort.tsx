import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Modal, Text, Button, View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

import {FlightData} from '../types/flightData';
import {removeDuplicates} from '../utils';

type FlightSortProps = {
  isOpen: boolean;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  flights: FlightData[];
  close: () => void;
};

const FlightSort = ({
  isOpen,
  flights,
  filter,
  sort,
  setFilter,
  setSort,
  close,
}: FlightSortProps) => {
  const onPressDone = () => {
    close();
  };

  const filteredFlights = removeDuplicates(flights, 'airline').map(
    f => f.airline,
  );

  return (
    <Modal transparent={true} visible={isOpen} onRequestClose={close}>
      <View style={styles.centeredView}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={close} />
          <Appbar.Content title={'Filters'} />
        </Appbar.Header>
        <View style={styles.content}>
          <View style={styles.filtersContainer}>
            <Text style={styles.label}>Airline</Text>
            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={filter}
              dropdownIconColor={'#5a5a5a'}
              onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}>
              <Picker.Item label="All Airlines" value="All" />

              {filteredFlights.map((flight, index) => (
                <Picker.Item key={index} label={flight} value={flight} />
              ))}
            </Picker>
            <Text style={styles.label}>Price</Text>
            <Picker
              mode="dropdown"
              style={styles.picker}
              selectedValue={sort}
              dropdownIconColor={'#5a5a5a'}
              onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
              <Picker.Item label="Cheapest first" value="priceAsc" />
              <Picker.Item label="Highest first" value="priceDesc" />
            </Picker>
          </View>

          <Button title="Done" onPress={onPressDone}></Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  appBar: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  picker: {
    color: '#5a5a5a',
    backgroundColor: '#fafafa',
  },
  content: {
    height: 450,
    backgroundColor: '#ffffff',
    padding: 22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filtersContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
    color: '#3a3a3a',
  },
  helperText: {
    fontSize: 13,
    color: '#8a8a8a',
  },
});

export default FlightSort;
