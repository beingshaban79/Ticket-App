import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";
import RouteCard from "../../components/RouteCard/RouteCard";

const ROUTES = [
  { id: "1", routeName: "Route 45B",  from: "Majestic",        to: "Electronic City" },
  { id: "2", routeName: "Route 101",  from: "Central Station", to: "Airport"         },
  { id: "3", routeName: "Route 250C", from: "KR Market",       to: "Yelahanka"       },
  { id: "4", routeName: "Route 335E", from: "Kempegowda BS",   to: "Whitefield"      },
  { id: "5", routeName: "Route 500D", from: "Hebbal",          to: "Silk Board"      },
];

const RouteSelection = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const filtered = ROUTES.filter((r) =>
    r.routeName.toLowerCase().includes(search.toLowerCase()) ||
    r.from.toLowerCase().includes(search.toLowerCase()) ||
    r.to.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* Pill search bar */}
        <View style={styles.searchWrapper}>
          <MaterialIcons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Route (e.g., 101, Airport)"
            placeholderTextColor="#9e9e9e"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Route list */}
        {filtered.map((route) => (
          <RouteCard
            key={route.id}
            routeName={route.routeName}
            from={route.from}
            to={route.to}
            onPress={() => {}}
          />
        ))}

        {filtered.length === 0 && (
          <Text style={styles.emptyText}>No routes found.</Text>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

export default RouteSelection;
