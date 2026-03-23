import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import HomeStack from "./HomeStack";
import Reports from "../screens/reports/Reports";
import Support from "../screens/support/Support";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#137fec",
        tabBarInactiveTintColor: "#9e9e9e",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: width * 0.03,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Reports: "description",
            Support: "help",
          };
          return <MaterialIcons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"    component={HomeStack} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Support" component={Support} />
    </Tab.Navigator>
  );
}
