import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConductorHome from "../screens/conductorHome/conductorHome";
import RouteSelection from "../screens/RouteSelection/RouteSelection";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConductorHome" component={ConductorHome} />
      <Stack.Screen name="RouteSelection" component={RouteSelection} />
    </Stack.Navigator>
  );
}
