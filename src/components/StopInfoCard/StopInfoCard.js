import React from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

const StopInfoCard = ({ lastStop, currentStop, nextStop }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.label}>Last Stop</Text>
        <Text style={styles.value}>{lastStop}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.label}>Current Stop</Text>
        <Text style={styles.value}>{currentStop}</Text>
      </View>
    </View>
    <View style={styles.cellFull}>
      <Text style={styles.label}>Next Stop</Text>
      <Text style={styles.value}>{nextStop}</Text>
    </View>
  </View>
);

export default StopInfoCard;
