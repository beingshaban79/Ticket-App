import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="App" component={AppNavigation} />
    </Stack.Navigator>
  );
}
