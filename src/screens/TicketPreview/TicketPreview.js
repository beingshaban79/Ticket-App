import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { BLEPrinter } from "react-native-thermal-receipt-printer";
import { issueTicket } from "../../redux/slices/bookingSlice";
import styles from "./Styles";
import TicketPreviewCard from "../../components/TicketPreviewCard/TicketPreviewCard";
import AppButton from "../../components/Button/Button";

// ─── BLE printer singleton helpers ───────────────────────────────────────────
let bleInitialized = false;

const initBLE = async () => {
  if (!bleInitialized) {
    await BLEPrinter.init();
    bleInitialized = true;
  }
};

const requestBLEPermissions = async () => {
  if (Platform.OS !== "android") return true;

  const grants = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);

  return Object.values(grants).every(
    (s) => s === PermissionsAndroid.RESULTS.GRANTED
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const TicketPreview = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { isIssuing } = useSelector((state) => state.booking);

  const {
    from,
    to,
    fromStopId,
    toStopId,
    passengerType,
    fare,
    baseFare,
    gst,
    distance,
    busNo,
  } = route.params || {};

  const now  = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const fareItems = [
    { label: `${passengerType || "Adult"} x 1`, amount: `₹ ${baseFare || fare || "0"}` },
    ...(Number(gst) > 0 ? [{ label: "GST", amount: `₹ ${gst}` }] : []),
  ];

  // ── Printer state ──────────────────────────────────────────────────────────
  const [printerModalVisible, setPrinterModalVisible] = useState(false);
  const [printers, setPrinters]                       = useState([]);
  const [scanLoading, setScanLoading]                 = useState(false);
  const [connectedPrinter, setConnectedPrinter]       = useState(null); // persists across prints
  const connectingRef = useRef(false);

  // Request permissions once on mount
  useEffect(() => {
    requestBLEPermissions();
  }, []);

  // ── Scan ───────────────────────────────────────────────────────────────────
  const scanForPrinters = async () => {
    const granted = await requestBLEPermissions();
    if (!granted) {
      Alert.alert(
        "Permissions Required",
        "Bluetooth & Location permissions are needed to find printers. Please enable them in Settings."
      );
      return;
    }

    setScanLoading(true);
    setPrinters([]);
    try {
      await initBLE();
      const devices = await BLEPrinter.getDeviceList();
      if (devices?.length) {
        setPrinters(devices);
      } else {
        Alert.alert(
          "No Printers Found",
          "Make sure your printer is ON and paired in phone Bluetooth settings, then scan again."
        );
      }
    } catch (err) {
      Alert.alert("Scan Error", err?.message || String(err));
    } finally {
      setScanLoading(false);
    }
  };

  // ── Connect ────────────────────────────────────────────────────────────────
  const connectToPrinter = async (printer) => {
    if (connectingRef.current) return;
    connectingRef.current = true;
    setScanLoading(true);
    try {
      await BLEPrinter.connectPrinter(printer.inner_mac_address);
      setConnectedPrinter(printer);
      setPrinterModalVisible(false);
      Alert.alert("Connected ✅", `Ready to print on ${printer.device_name}`);
    } catch (err) {
      Alert.alert("Connection Failed", err?.message || String(err));
    } finally {
      setScanLoading(false);
      connectingRef.current = false;
    }
  };

  // ── Build ticket text ──────────────────────────────────────────────────────
  const buildTicketText = (ticketNo) => {
    const line  = "--------------------------------";
    const dline = "================================";
    return (
      `[C]<b>BUS TICKET</b>\n` +
      `[C]${dline}\n` +
      `[L]Ticket No : ${ticketNo}\n` +
      `[L]Bus No    : ${busNo || "—"}\n` +
      `[C]${line}\n` +
      `[L]From      : ${from || "—"}\n` +
      `[L]To        : ${to || "—"}\n` +
      `[L]Distance  : ${distance ? `${distance} km` : "—"}\n` +
      `[C]${line}\n` +
      `[L]Passenger : ${passengerType || "Adult"}\n` +
      `[L]Base Fare : ₹ ${baseFare || fare || "0"}\n` +
      (Number(gst) > 0 ? `[L]GST       : ₹ ${gst}\n` : "") +
      `[L]Total     : ₹ ${fare || "0"}\n` +
      `[C]${dline}\n` +
      `[L]Date : ${date}   Time : ${time}\n` +
      `[C]${dline}\n` +
      `[L]\n[L]\n[L]\n`
    );
  };

  // ── Send to printer ────────────────────────────────────────────────────────
  const sendToPrinter = async (ticketNo) => {
    try {
      await initBLE();
      const text = buildTicketText(ticketNo);
      await BLEPrinter.printText(text);
    } catch (err) {
      // Non-fatal: ticket was already issued on backend
      Alert.alert(
        "Print Error",
        `Ticket issued but printing failed.\n\n${err?.message || err}\n\nYou can reconnect and retry.`
      );
    }
  };

  // ── Main button handler ────────────────────────────────────────────────────
  const handlePrint = async () => {
    // 1. If no printer connected yet, open the printer picker first
    if (!connectedPrinter) {
      setPrinterModalVisible(true);
      await scanForPrinters();
      return; // user must pick a printer; they'll press Print Ticket again
    }

    // 2. Issue ticket on backend
    const result = await dispatch(
      issueTicket({ fromStopId, toStopId, passengerType: passengerType || "Adult" })
    );

    const payload = result?.payload;
    const success = payload?.status;

    // 3. Print if backend succeeded
    if (success) {
      await sendToPrinter(payload?.ticketNo || payload?.ticket_number || "—");
    }

    // 4. Show backend message and navigate
    Alert.alert("", payload?.message || "Ticket issued.", [
      {
        text: "OK",
        onPress: () => {
          if (success) navigation.goBack();
        },
      },
    ]);
  };

  // ─── Printer picker modal ──────────────────────────────────────────────────
  const PrinterModal = () => (
    <Modal
      visible={printerModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setPrinterModalVisible(false)}
    >
      <View style={modal.overlay}>
        <View style={modal.sheet}>
          <Text style={modal.title}>Select Printer</Text>

          {scanLoading && (
            <View style={modal.center}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={modal.hint}>Scanning…</Text>
            </View>
          )}

          {!scanLoading && printers.length === 0 && (
            <Text style={modal.hint}>
              No printers found. Make sure your printer is ON and paired.
            </Text>
          )}

          <FlatList
            data={printers}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={modal.item}
                onPress={() => connectToPrinter(item)}
              >
                <Text style={modal.itemName}>
                  {item.device_name || "Unknown Printer"}
                </Text>
                <Text style={modal.itemAddr}>{item.inner_mac_address}</Text>
              </TouchableOpacity>
            )}
          />

          <View style={modal.actions}>
            <TouchableOpacity style={modal.rescan} onPress={scanForPrinters}>
              <Text style={modal.rescanText}>🔄 Rescan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modal.close}
              onPress={() => setPrinterModalVisible(false)}
            >
              <Text style={modal.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <PrinterModal />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <TicketPreviewCard
          date={date}
          time={time}
          from={from    || "—"}
          to={to        || "—"}
          distance={distance ? `${distance} km` : "—"}
          passengerType={passengerType || "Adult"}
          fareItems={fareItems}
          total={`₹ ${fare || "0"}`}
          busNo={busNo  || "—"}
        />
      </ScrollView>

      {/* Printer status strip */}
      {connectedPrinter && (
        <TouchableOpacity
          style={printerStrip.bar}
          onPress={() => {
            setPrinterModalVisible(true);
            scanForPrinters();
          }}
        >
          <Text style={printerStrip.text}>
            🖨 {connectedPrinter.device_name}  •  tap to change
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <AppButton
          variant="primary"
          size="lg"
          label={connectedPrinter ? "🖨  Print Ticket" : "🔍  Select Printer & Print"}
          loading={isIssuing}
          disabled={isIssuing}
          onPress={handlePrint}
        />
      </View>
    </SafeAreaView>
  );
};

// ─── Extra styles (only what's not in your Styles.js) ────────────────────────
const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#111",
  },
  center: { alignItems: "center", paddingVertical: 20 },
  hint: { textAlign: "center", color: "#666", marginVertical: 12, fontSize: 14 },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: { fontSize: 16, fontWeight: "600", color: "#222" },
  itemAddr: { fontSize: 12, color: "#999", marginTop: 2 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  rescan: {
    flex: 1,
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  rescanText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  close: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: { color: "#333", fontWeight: "600", fontSize: 15 },
});

const printerStrip = StyleSheet.create({
  bar: {
    backgroundColor: "#E8F5E9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#C8E6C9",
  },
  text: { fontSize: 13, color: "#2E7D32", textAlign: "center" },
});

export default TicketPreview;