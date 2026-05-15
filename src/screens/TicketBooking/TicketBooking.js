import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  fetchBookingData,
  updateBookingSelection,
  updateNextStop,
  clearRouteCompleted,
} from "../../redux/slices/bookingSlice";
import styles from "./Styles";
import StopInfoCard           from "../../components/StopInfoCard/StopInfoCard";
import UpdateStopButton       from "../../components/UpdateStopButton/UpdateStopButton";
import DropdownPicker         from "../../components/DropdownPicker/DropdownPicker";
import PassengerTypeSelector  from "../../components/PassengerTypeSelector/PassengerTypeSelector";
import FareInfoRow            from "../../components/FareInfoRow/FareInfoRow";
import TripStatsCard          from "../../components/TripStatsCard/TripStatsCard";
import AppButton              from "../../components/Button/Button";
import SubRouteCompletedModal from "../../components/SubRouteCompletedModal/SubRouteCompletedModal";
import CancelRouteBottomModal from "../../components/CancelRouteBottomModal/CancelRouteBottomModal";

const TicketBooking = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { routeId, routeName, subRoute } = route.params || {};

  const {
    bus, stopsContext, dropdowns, selection, quote, summary,
    isLoading, isUpdating, isUpdatingStop, routeCompleted, error,
  } = useSelector((state) => state.booking);

  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  // Initial load
  useEffect(() => {
    dispatch(fetchBookingData({ routeId, subRoute }));
  }, []);

  // Block hardware back button on Android
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => subscription.remove();
    }, [])
  );

  // ── Derived values ──
  const fromItems   = dropdowns?.from?.map((s) => s.stop_name) || [];
  const toItems     = dropdowns?.to?.map((s) => s.stop_name)   || [];
  const paxTypes    = dropdowns?.passenger_types               || [];

  const currentStop = stopsContext?.current_stop?.stop_name || "—";
  const lastStop    = stopsContext?.last_stop?.stop_name    || "—";
  const nextStop    = stopsContext?.next_stop?.stop_name    || "—";

  const currentToId = selection?.to_stop_id;
  const toStop      = currentToId
    ? dropdowns?.to?.find((s) => s.id === currentToId)?.stop_name || toItems[0] || "—"
    : toItems[0] || "—";

  const fromStop    = dropdowns?.from?.[0]?.stop_name || "—";
  const selectedPax = selection?.passenger_type || paxTypes[0] || "Adult";

  // ── Passenger type change ──
  const handlePaxChange = (type) => {
    dispatch(updateBookingSelection({
      routeId,
      subRoute,
      toStopId:      currentToId,
      passengerType: type,
    }));
  };

  // ── To stop change ──
  const handleToStopChange = (stopName) => {
    const stopObj = dropdowns?.to?.find((s) => s.stop_name === stopName);
    if (!stopObj) return;
    dispatch(updateBookingSelection({
      routeId,
      subRoute,
      toStopId:      stopObj.id,
      passengerType: selectedPax,
    }));
  };

  // ── Update to next stop ──
  const handleUpdateStop = () => {
    dispatch(updateNextStop());
  };

  // ── Route completed modal close → go back to route selection ──
  const handleRouteCompleted = () => {
    dispatch(clearRouteCompleted());
    navigation.navigate("App");
  };

  // ── Cancel route confirmed → go back to SubRouteSelection ──
  const handleCancelRoute = () => {
    setCancelModalVisible(false);
    navigation.goBack(); // back to SubRouteSelection
  };

  // ── Full screen loader on initial load ──
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

      {/* Header — back disabled, three-dots opens cancel modal */}
      <View style={styles.header}>
        <View style={styles.menuBtn} />
        <Text style={styles.headerTitle}>{routeName || "Ticket Booking"}</Text>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => setCancelModalVisible(true)}
        >
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

        {/* Updating stop loader — shown inline below StopInfoCard */}
        {isUpdatingStop && (
          <ActivityIndicator
            size="small"
            color="#137fec"
            style={{ marginBottom: 8 }}
          />
        )}

        {/* Update to Next Stop */}
        <UpdateStopButton
          onPress={handleUpdateStop}
          loading={isUpdatingStop}
        />

        {/* From — fixed */}
        <DropdownPicker
          label="From"
          value={fromStop}
          items={fromItems}
          onChange={() => {}}
        />

        {/* To — triggers API update */}
        <DropdownPicker
          label="To"
          value={toStop}
          items={toItems}
          onChange={handleToStopChange}
        />

        {/* Passenger Type — triggers API update */}
        <PassengerTypeSelector
          selected={selectedPax}
          onSelect={handlePaxChange}
          types={paxTypes}
        />

        {/* Fare */}
        <FareInfoRow
          distance={quote ? `${quote.distance_km} km` : "—"}
          fare={quote ? `₹${quote.total}` : "—"}
        />

        {/* Trip Stats */}
        <TripStatsCard
          totalTickets={String(summary?.total_tickets_so_far        ?? "—")}
          totalFare={`₹${summary?.total_fare_so_far                 ?? "—"}`}
          passengersOut={String(summary?.passenger_out_in_next_stop ?? "—")}
          availableSeats={String(summary?.total_available_seats     ?? "—")}
          bookedSeats={String(summary?.current_booked_seats         ?? "—")}
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
              routeName,
              from:          fromStop,
              to:            toStop,
              fromStopId:    dropdowns?.from?.[0]?.id ?? null,
              toStopId:      currentToId              ?? null,
              passengerType: selectedPax,
              fare:          String(quote?.total       ?? "0"),
              baseFare:      String(quote?.base_fare   ?? "0"),
              gst:           String(quote?.gst         ?? "0"),
              distance:      String(quote?.distance_km ?? "0"),
              busNo:         bus?.bus_number            ?? "—",
              busId:         bus?.bus_id                ?? null,
            })
          }
        />
      </View>

      {/* Sub-route completed modal — shown when no next stop */}
      <SubRouteCompletedModal
        visible={routeCompleted}
        onClose={handleRouteCompleted}
      />

      {/* Cancel route modal — opened via three-dots */}
      <CancelRouteBottomModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={handleCancelRoute}
      />

    </SafeAreaView>
  );
};

export default TicketBooking;
