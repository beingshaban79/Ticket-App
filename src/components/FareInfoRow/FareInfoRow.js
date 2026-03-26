import React from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

const FareInfoRow = ({ distance, fare }) => (
  <View style={styles.row}>
    <View style={styles.cell}>
      <Text style={styles.label}>Distance</Text>
      <Text style={styles.value}>{distance}</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.label}>Ticket Fare</Text>
      <Text style={[styles.value, styles.fare]}>{fare}</Text>
    </View>
  </View>
);

export default FareInfoRow;
