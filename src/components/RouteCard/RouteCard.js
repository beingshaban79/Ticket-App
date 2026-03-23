import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

/**
 * RouteCard
 * Props:
 *  routeName : string  e.g. "Route 45B"
 *  from      : string  e.g. "Majestic"
 *  to        : string  e.g. "Electronic City"
 *  onPress   : function
 */
const RouteCard = ({ routeName, from, to, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.iconBox}>
        <MaterialIcons name="directions-bus" size={22} color="#3d5a80" />
      </View>
      <View style={styles.info}>
        <Text style={styles.routeName}>{routeName}</Text>
        <Text style={styles.subtitle}>{from} → {to}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={22} color="#9e9e9e" />
    </TouchableOpacity>
  );
};

export default RouteCard;
