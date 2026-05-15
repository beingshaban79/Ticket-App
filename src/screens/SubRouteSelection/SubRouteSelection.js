import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRouteDetails,
  clearRouteDetails,
  startTrip,
  clearStartError,
} from "../../redux/slices/routeDetailsSlice";
import styles from "./Styles";

const SubRouteSelection = ({ navigation, route }) => {
  const { routeId, routeName } = route?.params || {};
  const dispatch = useDispatch();

  const { details, isLoading, error, isStarting, startError } =
    useSelector((state) => state.routeDetails);

  const [selectedDirection, setSelectedDirection] = useState(null);

  // Fetch route details on mount
  useEffect(() => {
    if (routeId) dispatch(fetchRouteDetails(routeId));
    return () => dispatch(clearRouteDetails());
  }, [routeId]);

  // Show backend error from startTrip
  useEffect(() => {
    if (startError) {
      Alert.alert("", startError, [
        { text: "OK", onPress: () => dispatch(clearStartError()) },
      ]);
    }
  }, [startError]);

  const subRoutes = details?.sub_routes || [];
  const busInfo   = details?.bus        || null;

  const handleConfirm = async () => {
    if (!selectedDirection) {
      Alert.alert("", "Please select at least one sub-route.");
      return;
    }

    const result = await dispatch(
      startTrip({ routeId, direction: selectedDirection })
    );

    // Only navigate if startTrip succeeded
    if (startTrip.fulfilled.match(result)) {
      navigation.navigate("TicketBooking", {
        routeId,
        routeName,
        subRoute: selectedDirection,
      });
    }
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#137fec" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  // ── Fetch error ──
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => dispatch(fetchRouteDetails(routeId))}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Sub-Route</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Route info */}
      <View style={styles.header}>
        <Text style={styles.route}>Route: {routeName ?? "—"}</Text>
        {busInfo && (
          <Text style={styles.meta}>Bus: {busInfo.bus_number}</Text>
        )}
      </View>

      {/* Sub-route cards */}
      <View style={styles.content}>
        {subRoutes.length === 0 ? (
          <Text style={styles.emptyText}>No sub-routes available.</Text>
        ) : (
          subRoutes.map((item) => {
            const isSelected = selectedDirection === item.direction;
            return (
              <TouchableOpacity
                key={item.direction}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedDirection(item.direction)}
                activeOpacity={0.8}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.iconBox}>
                    <Text style={styles.icon}>
                      {item.direction === "forward" ? "→" : "←"}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.cardText}>{item.label}</Text>
                    <Text style={styles.cardSub}>
                      {item.from_stop?.stop_name} → {item.to_stop?.stop_name}
                    </Text>
                  </View>
                </View>

                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={isStarting}
          style={[styles.button, isStarting && styles.buttonDisabled]}
          activeOpacity={0.85}
        >
          {isStarting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm & Start Trip</Text>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default SubRouteSelection;
