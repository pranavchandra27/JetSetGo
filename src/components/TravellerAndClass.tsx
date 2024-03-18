import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {Modal, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Appbar, SegmentedButtons} from 'react-native-paper';
import {TravellerData} from '../types/flightData';

type TravellerAndClassProps = {
  isOpen: boolean;
  travellerData: TravellerData;
  close: () => void;
  pressDone: (data: TravellerData) => void;
};

const TravellerAndClass = ({
  isOpen,
  travellerData,
  close,
  pressDone,
}: TravellerAndClassProps) => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [classType, setClassType] = useState('economy');

  useEffect(() => {
    setAdultCount(travellerData.adults);
    setChildCount(travellerData.children);
    setInfantCount(travellerData.infants);
    setClassType(travellerData.classType);
  }, [travellerData]);

  const handleAdultChange = (delta: number) => {
    if (adultCount + delta >= 0) {
      setAdultCount(adultCount + delta);
    }
  };

  const handleChildChange = (delta: number) => {
    if (childCount + delta >= 0) {
      setChildCount(childCount + delta);
    }
  };

  const handleInfantChange = (delta: number) => {
    if (infantCount + delta >= 0) {
      setInfantCount(infantCount + delta);
    }
  };

  const onPressDone = () => {
    pressDone({
      adults: adultCount,
      children: childCount,
      infants: infantCount,
      classType: classType,
    });
    close();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isOpen}
      onRequestClose={close}>
      <View style={styles.centeredView}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={close} />
          <Appbar.Content title={'Traveller & Class'} />
        </Appbar.Header>
        <View style={styles.content}>
          <Text style={styles.helperText}>ADD NUMBER OF TRAVELLERS</Text>
          <View style={styles.counterContainer}>
            <View>
              <Text style={styles.label}>Adults</Text>
              <Text style={styles.helperText}>
                12 yrs & above on the day of travel
              </Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => handleAdultChange(-1)}>
                <Text style={styles.button}>-</Text>
              </TouchableOpacity>
              <Text style={styles.value}>
                {adultCount.toString().padStart(2, '0')}
              </Text>
              <TouchableOpacity onPress={() => handleAdultChange(1)}>
                <Text style={styles.button}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.counterContainer}>
            <View>
              <Text style={styles.label}>Children</Text>
              <Text style={styles.helperText}>
                2 - 12 yrs on the day of travel
              </Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => handleChildChange(-1)}>
                <Text style={styles.button}>-</Text>
              </TouchableOpacity>
              <Text style={styles.value}>
                {childCount.toString().padStart(2, '0')}
              </Text>
              <TouchableOpacity onPress={() => handleChildChange(1)}>
                <Text style={styles.button}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.counterContainer}>
            <View>
              <Text style={styles.label}>Infants</Text>
              <Text style={styles.helperText}>
                Under 2 yrs on the day of travel
              </Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => handleInfantChange(-1)}>
                <Text style={styles.button}>-</Text>
              </TouchableOpacity>
              <Text style={styles.value}>
                {infantCount.toString().padStart(2, '0')}
              </Text>
              <TouchableOpacity onPress={() => handleInfantChange(1)}>
                <Text style={styles.button}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Class Type Selection */}
          <View style={styles.classContainer}>
            <Text style={styles.helperText}>CHOOSE CABIN CLASS</Text>

            <SegmentedButtons
              value={classType}
              style={styles.segment}
              onValueChange={setClassType}
              buttons={[
                {
                  value: 'economy',
                  label: 'Economy',
                },
                {
                  value: 'premium',
                  label: 'Premium',
                },
                {value: 'business', label: 'Business'},
              ]}
            />
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
  },

  content: {
    height: 450,
    backgroundColor: '#fafafa',
    padding: 22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: '#333',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  classContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3a3a3a',
  },
  helperText: {
    fontSize: 13,
    color: '#8a8a8a',
  },
  counter: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  segment: {
    marginVertical: 10,
  },
});

export default TravellerAndClass;
