import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  cityList: string[];
  isOpen: boolean;
  type: string;
  close: () => void;
  onCityPress: (city: string) => void;
};

const CityModal = ({cityList, type, isOpen, onCityPress, close}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={close}>
      <View style={styles.centeredView}>
        <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={close} />
          <Appbar.Content
            title={type === 'to' ? 'Arrival city' : 'Departure city'}
          />
        </Appbar.Header>

        <FlatList
          style={styles.listContainer}
          data={cityList}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.listItemContainer}>
              <TouchableOpacity
                onPress={() => {
                  onCityPress(item);
                }}>
                <View style={styles.listItem}>
                  <MaterialIcons
                    name="airplane-takeoff"
                    size={24}
                    color={'#aaa'}
                  />
                  <View style={{marginStart: 10}}>
                    <Text style={styles.listItemText}>{item}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  appBar: {
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  listItemContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fafafa',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 18,
    color: '#4a4a4a',
    fontWeight: '500',
  },
});

export default CityModal;
