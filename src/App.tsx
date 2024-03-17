import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import FlightSearch from './screens/FlightSearch';
import FlightResults from './screens/FlightResults';
import {RootStackParamList} from './types/navigationParams';
import FlightProvider from './context/FlightContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <FlightProvider>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={FlightSearch} />
          <Stack.Screen name="Flights" component={FlightResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </FlightProvider>
  );
};

export default App;
