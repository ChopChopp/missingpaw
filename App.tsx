import React from 'react';
import MainContainer from './navigation/MainContainer'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
