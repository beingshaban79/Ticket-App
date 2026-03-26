import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConductorHome from "../screens/conductorHome/conductorHome";

const Stack = createNativeStackNavigator();

// Only ConductorHome lives here — tab bar shows on this screen
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConductorHome" component={ConductorHome} />
    </Stack.Navigator>
  );
}
