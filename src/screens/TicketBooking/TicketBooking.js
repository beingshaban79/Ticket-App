import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../../redux/slices/bookingSlice";
import styles from "./Styles";
import StopInfoCard        from "../../components/StopInfoCard/StopInfoCard";
import UpdateStopButton    from "../../components/UpdateStopButton/UpdateStopButton";
import DropdownPicker      from "../../components/DropdownPicker/DropdownPicker";
import PassengerTypeSelector from "../../components/PassengerTypeSelector/PassengerTypeSelector";
import FareInfoRow         from "../../components/FareInfoRow/FareInfoRow";
import TripStatsCard       from "../../components/TripStatsCard/TripStatsCard";
import AppButton           from "../../components/Button/Button";

const TicketBooking = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { routeId, routeName, subRoute } = route.params || {};

  const {
    bus, stopsContext, dropdowns, selection, quote, summary,
    isLoading, error,
  } = useSelector((state) => state.booking);

  // Fetch booking data on mount
  useEffect(() => {
    dispatch(fetchBookingData({ routeId, subRoute }));
  }, []);

  // ── Derived values ──
  const fromItems  = dropdowns?.from?.map((s) => s.stop_name)  || [];
  const toItems    = dropdowns?.to?.map((s) => s.stop_name)    || [];
  const paxTypes   = dropdowns?.passenger_types                 || [];

  const currentStop = stopsContext?.current_stop?.stop_name || "—";
  const lastStop    = stopsContext?.last_stop?.stop_name    || "—";
  const nextStop    = stopsContext?.next_stop?.stop_name    || "—";

  const fromStop    = selection?.from_stop_id
    ? dropdowns?.from?.find((s) => s.id === selection.from_stop_id)?.stop_name || "—"
    : fromItems[0] || "—";

  const toStop      = selection?.to_stop_id
    ? dropdowns?.to?.find((s) => s.id === selection.to_stop_id)?.stop_name || "—"
    : toItems[0] || "—";

  const selectedPax = selection?.passenger_type || paxTypes[0] || "Adult";

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#137fec" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <Text style={{ color: "#ef4444", textAlign: "center", fontSize: 15 }}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{routeName || "Ticket Booking"}</Text>
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
          lastStop={lastStop}
          currentStop={currentStop}
          nextStop={nextStop}
        />

        {/* Update Stop */}
        <UpdateStopButton onPress={() => {}} />

        {/* From */}
        <DropdownPicker
          label="From"
          value={fromStop}
          items={fromItems}
          onChange={() => {}}
        />

        {/* To */}
        <DropdownPicker
          label="To"
          value={toStop}
          items={toItems}
          onChange={() => {}}
        />

        {/* Passenger Type */}
        <PassengerTypeSelector
          selected={selectedPax}
          onSelect={() => {}}
          types={paxTypes}
        />

        {/* Fare */}
        <FareInfoRow
          distance={quote ? `${quote.distance_km} km` : "—"}
          fare={quote ? `₹${quote.total}` : "—"}
        />

        {/* Trip Stats — from API summary */}
        <TripStatsCard
          totalTickets={String(summary?.total_tickets_so_far   ?? "—")}
          totalFare={`₹${summary?.total_fare_so_far            ?? "—"}`}
          passengersOut={String(summary?.passenger_out_in_next_stop ?? "—")}
          availableSeats={String(summary?.total_available_seats ?? "—")}
          bookedSeats={String(summary?.current_booked_seats    ?? "—")}
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
              from:          fromStop,
              to:            toStop,
              passengerType: selectedPax,
              fare:          String(quote?.total  ?? "0"),
              distance:      `${quote?.distance_km ?? 0} km`,
            })
          }
        />
      </View>

    </SafeAreaView>
  );
};

export default TicketBooking;
