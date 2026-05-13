import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubRouteCompletedModal from "../../components/SubRouteCompletedModal/SubRouteCompletedModal";
import CancelRouteBottomModal from "../../components/CancelRouteBottomModal/CancelRouteBottomModal";
import CancelTicketModal      from "../../components/CancelTicketModal/CancelTicketModal";
import styles from "./Styles";

/* ── Reusable row button ── */
const TestBtn = ({ label, color = "#137fec", onPress }) => (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: color }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.btnText}>{label}</Text>
  </TouchableOpacity>
);

const SectionLabel = ({ title }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

/* ── Screen ── */

const Support = ({ navigation }) => {
  const [subRouteModal,     setSubRouteModal]     = useState(false);
  const [cancelRouteModal,  setCancelRouteModal]  = useState(false);
  const [cancelTicketModal, setCancelTicketModal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>🧪 Test Playground</Text>
        <Text style={styles.sub}>Tap any button to preview screens or modals</Text>

        {/* ── Screens ── */}
        <SectionLabel title="SCREENS" />
        <TestBtn label="Owner Login"            color="#0f172a" onPress={() => navigation.navigate("OwnerLogin")}          />
        <TestBtn label="Owner Register"         color="#1e40af" onPress={() => navigation.navigate("OwnerRegister")}       />
        <TestBtn label="Forgot Password"        color="#7c3aed" onPress={() => navigation.navigate("ForgotPassword")}      />
        <TestBtn label="Owner Dashboard"        color="#0369a1" onPress={() => navigation.navigate("OwnerDashboard")}      />
        <TestBtn label="Conductor Management"   color="#065f46" onPress={() => navigation.navigate("ConductorManagement")} />

        {/* ── Modals ── */}
        <SectionLabel title="MODALS" />
        <TestBtn label="Sub-Route Complete Modal" color="#16a34a" onPress={() => setSubRouteModal(true)}     />
        <TestBtn label="Cancel Route Modal"       color="#d97706" onPress={() => setCancelRouteModal(true)}  />
        <TestBtn label="Cancel Ticket Modal"      color="#dc2626" onPress={() => setCancelTicketModal(true)} />

      </ScrollView>

      <SubRouteCompletedModal
        visible={subRouteModal}
        onClose={() => setSubRouteModal(false)}
      />
      <CancelRouteBottomModal
        visible={cancelRouteModal}
        onClose={() => setCancelRouteModal(false)}
        onConfirm={() => setCancelRouteModal(false)}
      />
      <CancelTicketModal
        visible={cancelTicketModal}
        onClose={() => setCancelTicketModal(false)}
        onConfirm={() => setCancelTicketModal(false)}
      />
    </SafeAreaView>
  );
};

export default Support;
