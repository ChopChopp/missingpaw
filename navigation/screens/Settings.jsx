import React from 'react';
import {Text, View} from 'react-native';

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text onPress={() => navigation.navigate('Settings')}>SETTINGS SCREEN</Text>
      <Text>Ooga Booga</Text>
    </View>
  );
};
export default Settings;