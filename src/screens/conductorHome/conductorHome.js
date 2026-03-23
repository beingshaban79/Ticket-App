import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Style";
import HomeCard from "../../components/HomeCard/HomeCard";

const ConductorHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHQjW1CAFcqtWHXOAgmtLXimJMZEEiI_2AtLstcd68EQxHpRgm7OGU5x4usk_WgDr5KvqyfSFnm_5XeKSiOvkpoR3lb10BdOspIhhayIAatFJePhERzRcPFMHeYjFzI15OjoVc2O__XDlKwU-Yt8r6uq0s_l57o2_GadjGZAWQhvJP2L3cCaiawQcHLndr0TEYPA01X4DQMj9m4bq_-vqiJeYQfTD1re72luzi0Nj0OB9fBswv6SlamIdQyrI3WFY43Ofs0C5qbRya" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>K. Sharma</Text>
            <Text style={styles.id}>ID: CND-4782</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.welcome}>Welcome!</Text>

        <Text style={styles.sectionTitle}>CURRENT STATUS</Text>

        <View style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <View style={styles.statusIcon}>
              <MaterialIcons name="directions-bus" size={22} />
            </View>
            <Text style={styles.statusText}>No Active Trip</Text>
          </View>
          <View style={styles.dot} />
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <HomeCard
            variant="primary"
            title="Route Selection"
            subtitle="Start a new trip"
            icon="alt-route"
            onPress={() => navigation.navigate("RouteSelection")}
          />
          <HomeCard
            variant="secondary"
            title="Daily Dashboard"
            subtitle="View today's performance"
            icon="monitor"
            onPress={() => {}}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ConductorHome;
