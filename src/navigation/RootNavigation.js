import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";
import RouteSelection from "../screens/RouteSelection/RouteSelection";
import TicketBooking from "../screens/TicketBooking/TicketBooking";
import TicketPreview from "../screens/TicketPreview/TicketPreview";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth flow */}
      <Stack.Screen name="Auth" component={AuthNavigation} />

      {/* Main app with bottom tabs */}
      <Stack.Screen name="App" component={AppNavigation} />

      {/* Full-screen stack screens — no tab bar */}
      <Stack.Screen name="RouteSelection" component={RouteSelection} />
      <Stack.Screen name="TicketBooking"  component={TicketBooking}  />
      <Stack.Screen name="TicketPreview"  component={TicketPreview}  />
    </Stack.Navigator>
  );
}
