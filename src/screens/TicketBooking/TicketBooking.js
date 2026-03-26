import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import StopInfoCard from "../../components/StopInfoCard/StopInfoCard";
import UpdateStopButton from "../../components/UpdateStopButton/UpdateStopButton";
import DropdownPicker from "../../components/DropdownPicker/DropdownPicker";
import PassengerTypeSelector from "../../components/PassengerTypeSelector/PassengerTypeSelector";
import FareInfoRow from "../../components/FareInfoRow/FareInfoRow";
import TripStatsCard from "../../components/TripStatsCard/TripStatsCard";
import AppButton from "../../components/Button/Button";

const STOPS = [
  "Central Bus Stand",
  "City Market",
  "National Stadium",
  "Airport Terminal",
  "KR Market",
  "Majestic",
  "Whitefield",
];

const TicketBooking = ({ navigation, route }) => {
  const { routeName } = route.params || {};
  const [passengerType, setPassengerType] = useState("adult");
  const [fromStop, setFromStop] = useState("City Market");
  const [toStop, setToStop] = useState("National Stadium");

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
          <MaterialIcons name="menu" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket Booking</Text>
        <TouchableOpacity style={styles.menuBtn}>
          <MaterialIcons name="more-vert" size={24} color="#212121" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stop Info */}
        <StopInfoCard
          lastStop="Central Bus Stand"
          currentStop="City Market"
          nextStop="National Stadium"
        />

        {/* Update Stop */}
        <UpdateStopButton onPress={() => {}} />

        {/* From */}
        <DropdownPicker
          label="From"
          value={fromStop}
          items={STOPS}
          onChange={setFromStop}
        />

        {/* To */}
        <DropdownPicker
          label="To"
          value={toStop}
          items={STOPS}
          onChange={setToStop}
        />

        {/* Passenger Type */}
        <PassengerTypeSelector
          selected={passengerType}
          onSelect={setPassengerType}
        />

        {/* Fare */}
        <FareInfoRow distance="12.5 km" fare="₹35.00" />

        {/* Trip Stats */}
        <TripStatsCard
          totalTickets="156"
          totalFare="₹12,450.00"
          passengersOut="5"
          availableSeats="15"
          bookedSeats="35"
        />
      </ScrollView>

      {/* Confirm and Print */}
      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label="🖨  Confirm and Print"
          onPress={() =>
            navigation.navigate("TicketPreview", {
              from: fromStop,
              to: toStop,
              passengerType,
              fare: "35.00",
              distance: "12.5 Km",
            })
          }
        />
      </View>

    </SafeAreaView>
  );
};

export default TicketBooking;
