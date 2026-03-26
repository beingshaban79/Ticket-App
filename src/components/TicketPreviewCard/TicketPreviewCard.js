import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./Styles";

const Divider = () => <View style={styles.divider} />;

const TicketPreviewCard = ({
  transportName = "ट्रांसपोर्ट नाम",
  date,
  time,
  seatNo,
  from,
  to,
  distance,
  departure,
  fareItems = [],
  total,
  busNo,
  conductor,
}) => (
  <View style={styles.card}>

    {/* Blue Header — inside card */}
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeaderTitle}>Ticket Preview</Text>
      <MaterialIcons name="print" size={22} color="#fff" />
    </View>

    {/* Transport Name */}
    <View style={styles.transportSection}>
      <Text style={styles.transportHindi}>{transportName}</Text>
      <Text style={styles.transportEng}>Transport Name</Text>
    </View>

    <Divider />

    {/* Date / Time / Seat */}
    <View style={styles.metaRow}>
      <View>
        <Text style={styles.metaText}>Date: {date}</Text>
        <Text style={styles.metaText}>Time: {time}</Text>
      </View>
      <View style={styles.seatBox}>
        <Text style={styles.seatLabel}>Seat No.</Text>
        <Text style={styles.seatNo}>{seatNo}</Text>
      </View>
    </View>

    <Divider />

    {/* From / Bus Icon / To */}
    <View style={styles.routeRow}>
      <View style={styles.routeStop}>
        <Text style={styles.stopLabel}>From</Text>
        <Text style={styles.stopName}>{from}</Text>
      </View>
      <View style={styles.busCenter}>
        <MaterialIcons name="directions-bus" size={26} color="#137fec" />
        <Text style={styles.distance}>{distance}</Text>
        <Text style={styles.departure}>Departure: {departure}</Text>
      </View>
      <View style={[styles.routeStop, styles.routeStopRight]}>
        <Text style={styles.stopLabel}>To</Text>
        <Text style={styles.stopName}>{to}</Text>
      </View>
    </View>

    <Divider />

    {/* Fare Items */}
    {fareItems.map((item, i) => (
      <View key={i} style={styles.fareRow}>
        <Text style={styles.fareLabel}>{item.label}</Text>
        <Text style={styles.fareAmount}>{item.amount}</Text>
      </View>
    ))}

    <Divider />

    {/* Total */}
    <View style={styles.totalRow}>
      <Text style={styles.totalLabel}>कुल (Total)</Text>
      <Text style={styles.totalAmount}>{total}</Text>
    </View>

    <Divider />

    {/* Footer */}
    <View style={styles.footer}>
      <Text style={styles.footerText}>Bus No: {busNo}</Text>
      <Text style={styles.footerText}>Conductor: {conductor}</Text>
      <Text style={styles.footerBold}>Happy Journey</Text>
      <Text style={styles.footerText}>Not Transferable</Text>
    </View>

  </View>
);

export default TicketPreviewCard;
