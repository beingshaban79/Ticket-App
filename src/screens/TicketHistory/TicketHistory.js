import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketHistory, cancelTicket } from '../../redux/slices/ticketHistorySlice';
import CancelTicketModal from '../../components/CancelTicketModal/CancelTicketModal';
import styles from './Styles';
const { width, height } = Dimensions.get('window');
// ─── Sub-components ───────────────────────────────────────────────────────────

// Icon based on passenger_type from API
const PASSENGER_ICONS = {
  adult:   { emoji: '👤', style: 'default' },
  child:   { emoji: '👦', style: 'default' },
  luggage: { emoji: '💼', style: 'orange'  },
};

const TicketIcon = ({ passengerType }) => {
  const key  = passengerType?.toLowerCase() || 'adult';
  const info = PASSENGER_ICONS[key] || PASSENGER_ICONS.adult;
  return (
    <View style={[
      styles.ticketIconBox,
      info.style === 'orange' ? styles.ticketIconBoxOrange : styles.ticketIconBoxDefault,
    ]}>
      <Text style={{ fontSize: 20 }}>{info.emoji}</Text>
    </View>
  );
};

const TicketCard = ({ ticket, onLongPress }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onLongPress={() => onLongPress(ticket)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      delayLongPress={700}
      style={[styles.ticketCard, pressed && styles.ticketCardPressed]}
    >
      <View style={styles.ticketCardLeft}>
        <TicketIcon passengerType={ticket.passenger_type} />
        <View style={styles.ticketInfo}>
          {/* From → To */}
          <View style={styles.ticketRoute}>
            <Text style={styles.ticketRouteText} numberOfLines={1}>
              {ticket.from_stop_name || ticket.from_stop || '—'}
            </Text>
            <Text style={styles.ticketRouteArrow}>›</Text>
            <Text style={styles.ticketRouteText} numberOfLines={1}>
              {ticket.to_stop_name || ticket.to_stop || '—'}
            </Text>
          </View>
          {/* TXN ID • time • type */}
          <View style={styles.ticketMeta}>
            <Text style={styles.ticketTxn}>
              {ticket.transaction_id || ticket.ticket_number || '—'}
            </Text>
            <Text style={styles.ticketDot}>•</Text>
            <Text style={styles.ticketTime}>
              {ticket.booked_time || (ticket.booked_at
                ? new Date(ticket.booked_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                : '—')}
            </Text>
            <Text style={styles.ticketDot}>•</Text>
            <Text style={styles.ticketTime}>{ticket.passenger_type || '—'}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.ticketAmount}>₹{ticket.total ?? ticket.fare ?? '0'}</Text>
    </Pressable>
  );
};

const CancelDialog = ({ ticket, onCancel, onClose }) => {
  if (!ticket) return null;
  return (
    <CancelTicketModal
      visible={!!ticket}
      onClose={onClose}
      onConfirm={() => onCancel(ticket)}
    />
  );
};

const ActiveTripCard = ({ activeTrip, bus, summary }) => {
  if (!activeTrip) return null;
  return (
    <View style={styles.activeTripSection}>
      <View style={styles.activeTripCard}>
        <View style={styles.activeTripTop}>
          <View>
            <Text style={styles.activeTripLabel}>Active Trip</Text>
            <Text style={styles.activeTripTitle}>
              {activeTrip.trip_number || '—'}
            </Text>
          </View>
          <View style={styles.routeBadge}>
            <Text style={styles.routeBadgeText}>
              {activeTrip.start_stop?.stop_name || '—'}
            </Text>
            <Text style={styles.routeArrow}>›</Text>
            <Text style={styles.routeBadgeText}>
              {activeTrip.end_stop?.stop_name || '—'}
            </Text>
          </View>
        </View>

        {/* Current stop */}
        {activeTrip.current_stop_name ? (
          <Text style={styles.currentStop}>
            📍 Current: {activeTrip.current_stop_name}
          </Text>
        ) : null}

        <View style={styles.activeTripStats}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Tickets Sold</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>
                {summary?.tickets_sold ?? 0}
              </Text>
              <Text style={styles.statUnit}>units</Text>
            </View>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Total Collection</Text>
            <Text style={styles.statAmount}>
              ₹{summary?.total_collection ?? 0}
            </Text>
          </View>
        </View>

        {bus && (
          <Text style={styles.busInfo}>
            🚌 {bus.bus_number}  •  {bus.total_seats} seats
          </Text>
        )}
      </View>
    </View>
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const TicketHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {
    activeTrip, bus, summary, tickets, isLoading, isCancelling, error,
  } = useSelector((state) => state.ticketHistory);

  const [search,         setSearch]         = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [localTickets,   setLocalTickets]   = useState([]);

  // Initial load
  useEffect(() => {
    dispatch(fetchTicketHistory(''));
  }, []);

  // Sync local tickets from Redux
  useEffect(() => {
    setLocalTickets(tickets);
  }, [tickets]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchTicketHistory(search));
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Sync trip — refresh
  const handleSync = () => {
    dispatch(fetchTicketHistory(search));
  };

  // Cancel ticket — call API, show backend message, remove from list
  const handleCancel = async (ticket) => {
    setSelectedTicket(null);
    const result = await dispatch(cancelTicket({
      ticketId: ticket.ticket_id,
      reason:   'Passenger cancelled',
    }));
    const msg = result?.payload?.message || 'Ticket cancelled.';
    Alert.alert('', msg);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => navigation?.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ticket History</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Trip */}
        <ActiveTripCard
          activeTrip={activeTrip}
          bus={bus}
          summary={summary}
        />

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search ticket number..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            {isLoading && (
              <ActivityIndicator size="small" color="#2563eb" />
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>ℹ</Text>
            <Text style={styles.infoText}>Long press to cancel</Text>
          </View>
        </View>

        {/* Error */}
        {error && !isLoading && (
          <Text style={[styles.emptyText, { color: '#dc2626' }]}>{error}</Text>
        )}

        {/* Ticket List */}
        <View style={styles.ticketListSection}>
          {isLoading && localTickets.length === 0 ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 32 }} />
          ) : localTickets.length === 0 ? (
            <Text style={styles.emptyText}>No tickets found.</Text>
          ) : (
            localTickets.map((ticket, i) => (
              <TicketCard
                key={ticket.ticket_number || ticket.id || i}
                ticket={ticket}
                onLongPress={setSelectedTicket}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, height * 0.02) }]}>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.reportBtn}>
            <Text style={styles.reportBtnIcon}>🖨</Text>
            <Text style={styles.reportBtnText}>REPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.syncBtn}
            onPress={handleSync}
            disabled={isLoading}
          >
            {isLoading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.syncBtnText}>SYNC TRIP</Text>
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* Cancel Ticket Modal */}
      <CancelDialog
        ticket={selectedTicket}
        onCancel={handleCancel}
        onClose={() => setSelectedTicket(null)}
      />

    </SafeAreaView>
  );
};

export default TicketHistory;
