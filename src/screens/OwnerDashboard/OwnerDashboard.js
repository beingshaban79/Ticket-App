import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

/* ── Sub-components ── */

const StatBox = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionCard = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.8}>
    <MaterialIcons name={icon} size={28} color="#137fec" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const InfoCell = ({ label, value, full }) => (
  <View style={[styles.infoBox, full && styles.infoBoxFull]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const BusCard = ({ name, route, current, next, tickets, fare, seats, conductor }) => (
  <View style={styles.busCard}>
    <View style={styles.busCardHeader}>
      <View>
        <Text style={styles.busName}>{name}</Text>
        <Text style={styles.busRoute}>{route}</Text>
      </View>
      <View style={styles.activeBadge}>
        <Text style={styles.activeBadgeText}>Active</Text>
      </View>
    </View>

    <View style={styles.stopRow}>
      <Text style={styles.stopLabel}>Current</Text>
      <Text style={styles.stopHighlight}>{current}</Text>
    </View>
    <View style={styles.stopRow}>
      <Text style={styles.stopLabel}>Next</Text>
      <Text style={styles.stopValue}>{next}</Text>
    </View>

    <View style={styles.infoGrid}>
      <InfoCell label="Tickets"   value={tickets}  />
      <InfoCell label="Fare"      value={fare}      />
      <InfoCell label="Seats"     value={seats}     />
      <InfoCell label="Conductor" value={conductor} full />
    </View>
  </View>
);

/* ── Data ── */

const STATS = [
  { label: "Active Buses", value: "12" },
  { label: "Conductors",   value: "18" },
  { label: "Total Routes", value: "25" },
];

const ACTIONS = [
  { icon: "people",           label: "Conductors" },
  { icon: "directions-bus",   label: "Buses"      },
  { icon: "alt-route",        label: "Routes"     },
  { icon: "description",      label: "Reports"    },
];

/* ── Screen ── */

const OwnerDashboard = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fleet Overview</Text>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={22} color="#137fec" />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((s) => <StatBox key={s.label} {...s} />)}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsGrid}>
        {ACTIONS.map((a) => <ActionCard key={a.label} {...a} onPress={() => {}} />)}
      </View>

      {/* Active Buses */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Buses</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <BusCard
        name="Bus #101"
        route="Central to Tech Park"
        current="Oak Avenue"
        next="Pine Plaza"
        tickets="42"
        fare="₹840"
        seats="25 / 40"
        conductor="Anil Kumar"
      />
      <BusCard
        name="Bus #203"
        route="Market to Airport"
        current="Highway Jn."
        next="Terminal 1"
        tickets="31"
        fare="₹1240"
        seats="35 / 50"
        conductor="Sunita Sharma"
      />
    </ScrollView>
  </SafeAreaView>
);

export default OwnerDashboard;
