import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const TYPES = [
  { key: "adult",   label: "Adult",   icon: "person"        },
  { key: "child",   label: "Child",   icon: "face"          },
  { key: "luggage", label: "Luggage", icon: "work"          },
];

const PassengerTypeSelector = ({ selected, onSelect }) => (
  <View style={styles.row}>
    {TYPES.map((type) => {
      const isActive = selected === type.key;
      return (
        <TouchableOpacity
          key={type.key}
          style={[styles.item, isActive && styles.itemActive]}
          onPress={() => onSelect(type.key)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={type.icon}
            size={26}
            color={isActive ? "#fff" : "#212121"}
          />
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {type.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default PassengerTypeSelector;
