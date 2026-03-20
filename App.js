import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BLEPrinter } from 'react-native-thermal-receipt-printer';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectedPrinter, setConnectedPrinter] = useState(null);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  // Dummy ticket data
  const ticketData = {
    ticketNumber: 'TKT-001',
    from: 'City Market',
    to: 'National Stadium',
    fare: '₹35.00',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };

  useEffect(() => {
    requestAllPermissions();
  }, []);

  const requestAllPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        
        const allGranted = Object.values(granted).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED
        );
        
        if (allGranted) {
          console.log('All Bluetooth permissions granted');
          checkBluetoothStatus();
        } else {
          Alert.alert(
            'Permissions Required',
            'This app needs Bluetooth and Location permissions to scan for printers. Please grant all permissions in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => {
                // User can manually enable in settings
              }}
            ]
          );
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const checkBluetoothStatus = async () => {
    try {
      await BLEPrinter.init();
      setBluetoothEnabled(true);
    } catch (error) {
      setBluetoothEnabled(false);
      console.log('Bluetooth not enabled:', error);
    }
  };

  const scanForPrinters = async () => {
    if (!bluetoothEnabled) {
      Alert.alert(
        'Bluetooth Required',
        'Please turn ON Bluetooth from your phone settings, then try again.',
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);
    setPrinters([]);
    
    try {
      // Initialize BLE Printer
      await BLEPrinter.init();
      console.log('BLE Printer initialized');
      
      // Show scanning message
      Alert.alert('Scanning...', 'Looking for Bluetooth devices. Please wait.');
      
      // Get paired/available devices
      const devices = await BLEPrinter.getDeviceList();
      console.log('Found printers:', devices);
      
      if (devices && devices.length > 0) {
        setPrinters(devices);
        Alert.alert(
          '✅ Devices Found',
          `Found ${devices.length} Bluetooth device(s). Tap on a device below to connect.`
        );
      } else {
        Alert.alert(
          '⚠️ No Devices Found',
          'No Bluetooth devices found.\n\nSteps:\n1. Turn ON your Shreyans SRS583 printer\n2. Go to Settings → Bluetooth\n3. Pair the printer\n4. Come back and scan again'
        );
      }
    } catch (error) {
      console.error('Scan error:', error);
      Alert.alert(
        '❌ Scan Failed', 
        'Could not scan for devices.\n\nMake sure:\n• Bluetooth is ON\n• Location permission is granted\n• Printer is turned ON\n\nError: ' + (error.message || error)
      );
    } finally {
      setLoading(false);
    }
  };

  const connectToPrinter = async (printer) => {
    setLoading(true);
    try {
      await BLEPrinter.connectPrinter(printer.inner_mac_address);
      setIsConnected(true);
      setConnectedPrinter(printer);
      Alert.alert(
        '✅ Connected Successfully!', 
        `Connected to:\n${printer.device_name}\n\nYou can now print tickets.`
      );
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert(
        '❌ Connection Failed', 
        `Could not connect to ${printer.device_name}\n\nTry:\n• Turn printer OFF and ON\n• Move closer to printer\n• Check printer battery\n\nError: ` + (error.message || error)
      );
    } finally {
      setLoading(false);
    }
  };

  const printTicket = async () => {
    if (!isConnected) {
      Alert.alert(
        '⚠️ Not Connected', 
        'Please connect to a printer first by:\n1. Tapping "Scan for Printers"\n2. Selecting your printer from the list'
      );
      return;
    }

    setLoading(true);
    try {
      // Format ticket text for thermal printer
      const ticketText = `
[C]<b>TICKET RECEIPT</b>
[C]================================
[L]
[L]Ticket No: ${ticketData.ticketNumber}
[L]From: ${ticketData.from}
[L]To: ${ticketData.to}
[L]Fare: ${ticketData.fare}
[L]--------------------------------
[L]Date: ${ticketData.date}
[L]Time: ${ticketData.time}
[L]================================
[L]
[L]
[L]
`;

      await BLEPrinter.printText(ticketText);
      Alert.alert(
        '✅ Print Successful!', 
        'Ticket has been sent to the printer.\n\nCheck your thermal printer for the receipt.'
      );
    } catch (error) {
      console.error('Print error:', error);
      Alert.alert(
        '❌ Print Failed', 
        'Could not print ticket.\n\nCheck:\n• Printer has paper\n• Printer is ON\n• Printer is still connected\n\nError: ' + (error.message || error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎫 Thermal Printer</Text>
        <Text style={styles.status}>
          {isConnected ? '🟢 Connected' : '🔴 Not Connected'}
        </Text>
        {isConnected && connectedPrinter && (
          <Text style={styles.connectedDevice}>
            📱 {connectedPrinter.device_name}
          </Text>
        )}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Ticket Preview */}
        <View style={styles.ticketPreview}>
          <Text style={styles.sectionTitle}>Ticket Preview</Text>
          <View style={styles.ticketCard}>
            <Text style={styles.ticketText}>Ticket No: {ticketData.ticketNumber}</Text>
            <Text style={styles.ticketText}>From: {ticketData.from}</Text>
            <Text style={styles.ticketText}>To: {ticketData.to}</Text>
            <Text style={styles.ticketText}>Fare: {ticketData.fare}</Text>
            <Text style={styles.ticketText}>Date: {ticketData.date}</Text>
            <Text style={styles.ticketText}>Time: {ticketData.time}</Text>
          </View>
        </View>

        {/* Printer List */}
        {printers.length > 0 && (
          <View style={styles.printerList}>
            <Text style={styles.sectionTitle}>Available Printers</Text>
            {printers.map((printer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.printerItem}
                onPress={() => connectToPrinter(printer)}
              >
                <Text style={styles.printerName}>{printer.device_name || 'Unknown Printer'}</Text>
                <Text style={styles.printerAddress}>{printer.inner_mac_address}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.scanButton]}
            onPress={scanForPrinters}
            disabled={loading}
          >
            {loading && !isConnected ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>🔍 Scan for Printers</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.printButton, !isConnected && styles.buttonDisabled]}
            onPress={printTicket}
            disabled={!isConnected || loading}
          >
            {loading && isConnected ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>🖨️ Generate Ticket</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>📋 Quick Guide:</Text>
          {!bluetoothEnabled && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ Turn ON Bluetooth first!</Text>
            </View>
          )}
          <Text style={styles.instructionText}>
            {isConnected 
              ? '✅ Printer connected! Tap "Generate Ticket" to print.'
              : '1️⃣ Turn ON Bluetooth\n2️⃣ Turn ON your Shreyans SRS583 printer\n3️⃣ Tap "Scan for Printers" below\n4️⃣ Select your printer from the list\n5️⃣ Tap "Generate Ticket" to print'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  connectedDevice: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  ticketPreview: {
    marginBottom: 24,
  },
  ticketCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  printerList: {
    marginBottom: 20,
  },
  printerItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  printerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  printerAddress: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scanButton: {
    backgroundColor: '#34C759',
  },
  printButton: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
    lineHeight: 22,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
  },
});