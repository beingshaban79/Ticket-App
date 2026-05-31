import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  background:   '#f8fafc',
  white:        '#ffffff',
  border:       '#f1f5f9',
  borderLight:  '#e2e8f0',
  textPrimary:  '#111827',
  textSecondary:'#6b7280',
  textMuted:    '#9ca3af',
  blue:         '#2563eb',
  blueShadow:   '#bfdbfe',
  blueLight:    '#eff6ff',
  orange:       '#fb923c',
  orangeLight:  '#fff7ed',
  orangeBorder: '#fed7aa',
  red:          '#dc2626',
  redLight:     '#fef2f2',
  gray50:       '#f9fafb',
  gray100:      '#f3f4f6',
  gray200:      '#e5e7eb',
  gray400:      '#9ca3af',
  gray500:      '#6b7280',
  gray600:      '#4b5563',
  gray800:      '#1f2937',
  gray900:      '#111827',
};

export default StyleSheet.create({
  // ─── Root ───────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: height * 0.02,
  },

  // ─── Header ─────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerBackBtn: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray100,
  },
  headerBackIcon: {
    fontSize: width * 0.05,
    color: COLORS.gray800,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: '800',
    color: COLORS.gray900,
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: width * 0.1,
  },

  // ─── Active Trip Card ────────────────────────────────────
  activeTripSection: {
    padding: width * 0.05,
  },
  activeTripCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: width * 0.05,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  activeTripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: height * 0.025,
  },
  activeTripLabel: {
    fontSize: width * 0.025,
    fontWeight: '800',
    color: COLORS.blue,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  activeTripTitle: {
    fontSize: width * 0.075,
    fontWeight: '900',
    color: COLORS.gray900,
    letterSpacing: -0.5,
  },
  routeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    gap: 6,
  },
  routeBadgeText: {
    fontSize: width * 0.028,
    fontWeight: '800',
    color: COLORS.gray600,
  },
  routeArrow: {
    fontSize: width * 0.022,
    color: COLORS.gray400,
  },
  activeTripStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statBlock:    { flex: 1 },
  statLabel: {
    fontSize: width * 0.025,
    fontWeight: '800',
    color: COLORS.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  statValue: {
    fontSize: width * 0.06,
    fontWeight: '800',
    color: COLORS.gray800,
  },
  statUnit: {
    fontSize: width * 0.028,
    color: COLORS.gray400,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  statAmount: {
    fontSize: width * 0.055,
    fontWeight: '800',
    color: COLORS.gray800,
  },

  // ─── Search ──────────────────────────────────────────────
  searchSection: {
    paddingHorizontal: width * 0.05,
    gap: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: height * 0.016,
    gap: 10,
  },
  searchIcon: {
    fontSize: width * 0.035,
    color: COLORS.gray400,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.035,
    color: COLORS.gray900,
    padding: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 6,
  },
  infoIcon: {
    fontSize: width * 0.028,
    color: COLORS.gray400,
  },
  infoText: {
    fontSize: width * 0.025,
    fontWeight: '800',
    color: COLORS.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ─── Ticket List ─────────────────────────────────────────
  ticketListSection: {
    marginTop: 16,
    paddingHorizontal: width * 0.05,
    gap: 10,
  },
  busInfo: {
    fontSize: width * 0.03,
    color: COLORS.gray500,
    marginTop: 10,
  },
  currentStop: {
    fontSize: width * 0.03,
    color: COLORS.blue,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray400,
    fontSize: width * 0.035,
    marginTop: 24,
  },

  // ─── Ticket Card ─────────────────────────────────────────
  ticketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.035,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  ticketCardPressed: {
    backgroundColor: COLORS.gray50,
  },
  ticketCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  ticketIconBox: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  ticketIconBoxDefault: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray100,
  },
  ticketIconBoxOrange: {
    backgroundColor: COLORS.orangeLight,
    borderColor: COLORS.orangeBorder,
  },
  ticketInfo:   { flex: 1 },
  ticketRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketRouteText: {
    fontSize: width * 0.033,
    fontWeight: '700',
    color: COLORS.gray800,
  },
  ticketRouteArrow: {
    fontSize: width * 0.022,
    color: COLORS.gray400,
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 4,
  },
  ticketTxn: {
    fontSize: width * 0.028,
    fontWeight: '600',
    color: COLORS.gray500,
  },
  ticketDot: {
    fontSize: width * 0.028,
    color: COLORS.gray400,
  },
  ticketTime: {
    fontSize: width * 0.028,
    color: COLORS.gray400,
  },
  ticketAmount: {
    fontSize: width * 0.038,
    fontWeight: '900',
    color: COLORS.gray900,
  },

  // ─── Cancel Dialog ───────────────────────────────────────
  cancelOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  cancelSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: width * 0.06,
    paddingBottom: height * 0.05,
  },
  cancelTitle: {
    fontSize: width * 0.04,
    fontWeight: '800',
    color: COLORS.gray900,
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
  cancelButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelYesBtn: {
    flex: 1,
    paddingVertical: height * 0.018,
    backgroundColor: COLORS.redLight,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelYesText: {
    fontSize: width * 0.033,
    fontWeight: '800',
    color: COLORS.red,
  },
  cancelNoBtn: {
    flex: 1,
    paddingVertical: height * 0.018,
    backgroundColor: COLORS.gray100,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelNoText: {
    fontSize: width * 0.033,
    fontWeight: '800',
    color: COLORS.gray600,
  },

  // ─── Footer ──────────────────────────────────────────────
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  reportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 18,
    gap: 8,
    elevation: 1,
  },
  reportBtnIcon: {
    fontSize: width * 0.035,
    color: COLORS.gray800,
  },
  reportBtnText: {
    fontSize: width * 0.033,
    fontWeight: '800',
    color: COLORS.gray800,
    letterSpacing: 0.5,
  },
  syncBtn: {
    flex: 1.5,
    paddingVertical: height * 0.02,
    backgroundColor: COLORS.blue,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.blueShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  syncBtnText: {
    fontSize: width * 0.033,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
