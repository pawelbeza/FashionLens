/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from './screens/SplashScreen/SplashScreen';
import ClothesDetector from './screens/ClothesDetector/ClothesDetector';
import VideoDetector from './screens/VideoDetector/VideoDetector';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Detector" component={ClothesDetector} />
        <Stack.Screen name="VideoDetector" component={VideoDetector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
