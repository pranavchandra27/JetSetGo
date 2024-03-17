import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Appbar} from 'react-native-paper';

type CalendarViewProps = {
  isOpen: boolean;
  type: string;
  onDaySelect: (day: string) => void;
  close: () => void;
};

const CalendarView = ({
  isOpen,
  close,
  type,
  onDaySelect,
}: CalendarViewProps) => {
  const onDayPress = (day: any) => {
    onDaySelect(day.dateString);
  };

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
            title={type === 'departure' ? 'Departure date' : 'Arrival date'}
          />
        </Appbar.Header>
        <Calendar
          onDayPress={onDayPress}
          minDate={
            new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split('T')[0]
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: '#fff',
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

export default CalendarView;
