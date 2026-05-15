import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

// Icon map keyed by lowercase type name
const ICON_MAP = {
  adult:   "person",
  child:   "face",
  luggage: "work",
};

const PassengerTypeSelector = ({ selected, onSelect, types = [] }) => (
  <View style={styles.row}>
    {types.map((type) => {
      // API sends "Adult", "Child", "Luggage" — compare case-insensitively
      const isActive = selected?.toLowerCase() === type.toLowerCase();
      const icon     = ICON_MAP[type.toLowerCase()] || "person";

      return (
        <TouchableOpacity
          key={type}
          style={[styles.item, isActive && styles.itemActive]}
          onPress={() => onSelect(type)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={icon}
            size={26}
            color={isActive ? "#fff" : "#212121"}
          />
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {type}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default PassengerTypeSelector;
