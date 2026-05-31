import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation      from "./AuthNavigation";
import AppNavigation       from "./AppNavigation";
import RouteSelection      from "../screens/RouteSelection/RouteSelection";
import SubRouteSelection   from "../screens/SubRouteSelection/SubRouteSelection";
import TicketBooking       from "../screens/TicketBooking/TicketBooking";
import TicketPreview       from "../screens/TicketPreview/TicketPreview";
import OwnerLogin          from "../screens/OwnerLogin/OwnerLogin";
import OwnerRegister       from "../screens/OwnerRegister/OwnerRegister";
import OwnerDashboard      from "../screens/OwnerDashboard/OwnerDashboard";
import ForgotPassword      from "../screens/ForgotPassword/ForgotPassword";
import ConductorManagement from "../screens/Conductor Management/Conductor_Management";
import EditProfile         from "../screens/EditProfile/EditProfile";
import History             from "../screens/History/History";
import MyProfile           from "../screens/MyProfile/MyProfile";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth"                component={AuthNavigation}      />
      <Stack.Screen name="App"                 component={AppNavigation}       />
      <Stack.Screen name="RouteSelection"      component={RouteSelection}      />
      <Stack.Screen name="SubRouteSelection"   component={SubRouteSelection}   />
      <Stack.Screen name="TicketBooking"       component={TicketBooking}       />
      <Stack.Screen name="TicketPreview"       component={TicketPreview}       />
      <Stack.Screen name="OwnerLogin"          component={OwnerLogin}          />
      <Stack.Screen name="OwnerRegister"       component={OwnerRegister}       />
      <Stack.Screen name="OwnerDashboard"      component={OwnerDashboard}      />
      <Stack.Screen name="ForgotPassword"      component={ForgotPassword}      />
      <Stack.Screen name="ConductorManagement" component={ConductorManagement} />
      <Stack.Screen name="EditProfile"         component={EditProfile}         />
      <Stack.Screen name="History"             component={History}             />
      <Stack.Screen name="MyProfile"           component={MyProfile}           />
    </Stack.Navigator>
  );
}
