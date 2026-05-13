import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";

const SubRouteSelection = ({ navigation, route }) => {
  const { routeName } = route?.params || {};
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    { id: "rath-jhansi", title: "Rath to Jhansi", icon: "→" },
    { id: "jhansi-rath", title: "Jhansi to Rath", icon: "←" },
  ];

  const handleConfirm = () => {
    navigation.navigate("TicketBooking", { routeName, subRoute: selectedRoute });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Select Sub-Route</Text>
        <Text style={styles.route}>Route: {routeName ?? "—"}</Text>
        <Text style={styles.meta}>
          Bus: UP95 A1234 | Date: 24 Oct 2023
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.content}>
        {routes.map((item) => {
          const isSelected = selectedRoute === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelectedRoute(item.id)}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>

              {/* Radio */}
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <Text style={styles.check}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!selectedRoute}
          onPress={handleConfirm}
          style={[styles.button, !selectedRoute && styles.buttonDisabled]}
        >
          <Text
            style={[
              styles.buttonText,
              !selectedRoute && styles.buttonTextDisabled,
            ]}
          >
            Confirm & Start Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubRouteSelection;
