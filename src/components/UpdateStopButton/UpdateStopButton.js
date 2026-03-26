import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const UpdateStopButton = ({ onPress }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.8}>
    <MaterialIcons name="double-arrow" size={18} color="#137fec" style={{ marginRight: 6 }} />
    <Text style={styles.text}>Update to Next Stop</Text>
  </TouchableOpacity>
);

export default UpdateStopButton;
