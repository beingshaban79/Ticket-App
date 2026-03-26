import React from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

const StatCell = ({ label, value }) => (
  <View style={styles.cell}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const TripStatsCard = ({ totalTickets, totalFare, passengersOut, availableSeats, bookedSeats }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <StatCell label="Total Tickets so far" value={totalTickets} />
      <StatCell label="Total Fare so far"    value={totalFare}    />
    </View>
    <View style={styles.row}>
      <StatCell label="Passenger out in next stop" value={passengersOut}  />
      <StatCell label="Total available seats"      value={availableSeats} />
    </View>
    <View style={styles.rowSingle}>
      <StatCell label="Current booked seats" value={bookedSeats} />
    </View>
  </View>
);

export default TripStatsCard;
