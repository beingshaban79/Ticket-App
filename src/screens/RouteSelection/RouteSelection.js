import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../../redux/slices/routeSlice";
import styles from "./Styles";
import RouteCard from "../../components/RouteCard/RouteCard";
import RouteConfirmModal from "../../components/RouteConfirmModal/RouteConfirmModal";

const RouteSelection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { routes, isLoading, error } = useSelector((state) => state.routes);

  const [search, setSearch]               = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalVisible, setModalVisible]   = useState(false);

  // Fetch routes on mount
  useEffect(() => {
    dispatch(fetchRoutes());
  }, []);

  const filtered = routes.filter((r) =>
    r.route_name.toLowerCase().includes(search.toLowerCase()) ||
    r.display_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardPress = (route) => {
    setSelectedRoute(route);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate("SubRouteSelection", {
      routeId:   selectedRoute?.id,
      routeName: selectedRoute?.route_name,
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedRoute(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Main Route</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Select Your Route</Text>

        {/* Search bar */}
        <View style={styles.searchWrapper}>
          <MaterialIcons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search route..."
            placeholderTextColor="#9e9e9e"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Loading */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#137fec"
            style={{ marginTop: 40 }}
          />
        )}

        {/* Error */}
        {!isLoading && error && (
          <Text style={styles.emptyText}>{error}</Text>
        )}

        {/* Route list */}
        {!isLoading && !error && filtered.map((route) => (
          <RouteCard
            key={route.id}
            routeName={route.route_name}
            from={route.display_name}
            onPress={() => handleCardPress(route)}
          />
        ))}

        {!isLoading && !error && filtered.length === 0 && routes.length > 0 && (
          <Text style={styles.emptyText}>No routes found.</Text>
        )}
      </ScrollView>

      {/* Confirm Modal */}
      <RouteConfirmModal
        visible={modalVisible}
        routeName={selectedRoute?.route_name}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

    </SafeAreaView>
  );
};

export default RouteSelection;
