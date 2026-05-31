import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary:               '#005baf',
  primaryFixed:          '#d5e3ff',
  onPrimary:             '#ffffff',
  background:            '#f9f9ff',
  surface:               '#f9f9ff',
  surfaceContainerLow:   '#f1f3fd',
  surfaceContainerLowest:'#ffffff',
  onSurface:             '#181c22',
  onSurfaceVariant:      '#414753',
  outlineVariant:        '#c1c6d5',
  zinc200:               '#e4e4e7',
  zinc500:               '#71717a',
  white:                 '#ffffff',
};

export default StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#f9f9ff' },
  container:     { flex: 1, backgroundColor: '#f9f9ff' },
  scrollContent: {
    paddingHorizontal: width * 0.04,
    paddingTop:        height * 0.03,
    paddingBottom:     height * 0.13,
    gap:               height * 0.03,
  },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    height: height * 0.08,
    backgroundColor: '#f9f9ff',
    borderBottomWidth: 1, borderBottomColor: '#c1c6d5',
  },
  headerLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerBackBtn: {
    width: width * 0.1, height: width * 0.1,
    borderRadius: width * 0.05,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: width * 0.045, fontWeight: '700',
    color: '#005baf', letterSpacing: -0.2,
  },
  headerMoreBtn: {
    width: width * 0.1, height: width * 0.1,
    borderRadius: width * 0.05,
    alignItems: 'center', justifyContent: 'center',
  },

  // Profile hero card
  profileCard: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: '#e4e4e7',
    overflow: 'hidden', elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  profileBanner:        { height: height * 0.12, backgroundColor: '#e8f0fc' },
  profileAvatarSection: {
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    paddingBottom: height * 0.03,
    marginTop: -(width * 0.12),
  },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: width * 0.24, height: width * 0.24,
    borderRadius: width * 0.12,
    borderWidth: 4, borderColor: '#fff',
  },
  avatarBadge: {
    position: 'absolute', bottom: 2, right: 2,
    backgroundColor: '#005baf',
    borderRadius: width * 0.03,
    width: width * 0.055, height: width * 0.055,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  avatarBadgeText: { color: '#fff', fontSize: width * 0.03, fontWeight: '700' },
  profileName: {
    fontSize: width * 0.07, fontWeight: '700',
    color: '#181c22', marginTop: height * 0.02,
    letterSpacing: -0.3, textAlign: 'center',
  },
  roleBadge: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: height * 0.01,
    paddingHorizontal: 12, paddingVertical: 5,
    backgroundColor: '#005baf', borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: width * 0.028, fontWeight: '700',
    color: '#fff', letterSpacing: 1.5, textTransform: 'uppercase',
  },

  // Section label
  sectionLabel: {
    fontSize: width * 0.028, fontWeight: '700',
    color: '#71717a', letterSpacing: 1.2,
    textTransform: 'uppercase', marginBottom: 10,
  },

  // Info cards grid
  cardGrid:    { flexDirection: 'row', gap: 12 },
  infoCard: {
    flex: 1, backgroundColor: '#f1f3fd',
    borderRadius: 12, borderWidth: 1, borderColor: '#e4e4e7',
    padding: width * 0.035,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  infoCardIcon: {
    width: width * 0.12, height: width * 0.12,
    borderRadius: 10, backgroundColor: '#e8f0fc',
    alignItems: 'center', justifyContent: 'center',
  },
  infoCardIconText: { fontSize: width * 0.055 },
  infoCardLabel: {
    fontSize: width * 0.025, fontWeight: '700',
    color: '#71717a', textTransform: 'uppercase',
    letterSpacing: 0.8, marginBottom: 3,
  },
  infoCardValue: {
    fontSize: width * 0.038, fontWeight: '700',
    color: '#181c22', flexShrink: 1,
  },

  // Route card
  routeCard: {
    backgroundColor: '#f1f3fd', borderRadius: 12,
    borderWidth: 1, borderColor: '#e4e4e7', padding: width * 0.04,
  },
  routeCardTop: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 14, marginBottom: height * 0.018,
  },
  routeCardIcon: {
    width: width * 0.12, height: width * 0.12,
    borderRadius: 10, backgroundColor: '#e8f0fc',
    alignItems: 'center', justifyContent: 'center',
  },
  routeCardIconText: { fontSize: width * 0.055 },
  routeCardLabel: {
    fontSize: width * 0.025, fontWeight: '700',
    color: '#71717a', textTransform: 'uppercase',
    letterSpacing: 0.8, marginBottom: 3,
  },
  routeCardValue: { fontSize: width * 0.04, fontWeight: '700', color: '#181c22' },
  currentStop: {
    fontSize: width * 0.03,
    color: '#005baf',
    fontWeight: '600',
    marginTop: 4,
  },
  routeMapBox: {
    height: height * 0.16, backgroundColor: '#e4e4e7',
    borderRadius: 10, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  routeMapImage: { position: 'absolute', width: '100%', height: '100%', opacity: 0.5 },
  liveChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: '#c8d9f5', gap: 7,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#005baf' },
  liveText: { fontSize: width * 0.028, fontWeight: '700', color: '#005baf', letterSpacing: 0.3 },

  // Subscription card
  subCard: {
    backgroundColor: '#f1f3fd', borderRadius: 12,
    borderWidth: 1, borderColor: '#e4e4e7', padding: width * 0.04,
  },
  subCardTop: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: height * 0.02,
  },
  subCardLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subCardIcon: {
    width: width * 0.1, height: width * 0.1,
    borderRadius: 10, backgroundColor: '#e8f0fc',
    alignItems: 'center', justifyContent: 'center',
  },
  subCardIconText: { fontSize: width * 0.05 },
  subCardTitle:    { fontSize: width * 0.04, fontWeight: '700', color: '#181c22' },
  subCardSubtitle: { fontSize: width * 0.028, color: '#71717a', marginTop: 1 },
  activePill: {
    paddingHorizontal: 10, paddingVertical: 4,
    backgroundColor: '#e8f0fc', borderRadius: 10,
    borderWidth: 1, borderColor: '#c8d9f5',
  },
  activePillText: {
    fontSize: width * 0.025, fontWeight: '700',
    color: '#005baf', letterSpacing: 0.8, textTransform: 'uppercase',
  },
  divider:      { height: 1, backgroundColor: '#e4e4e7', marginBottom: height * 0.02 },
  subCardStats: { flexDirection: 'row', gap: 16 },
  subStatBlock: { flex: 1 },
  subStatLabel: {
    fontSize: width * 0.025, fontWeight: '700',
    color: '#71717a', textTransform: 'uppercase',
    letterSpacing: 0.8, marginBottom: 3,
  },
  subStatValue: { fontSize: width * 0.038, color: '#181c22', fontWeight: '500' },

  // Contact
  contactSpacing: { gap: 10 },
  contactCard: {
    backgroundColor: '#f1f3fd', borderRadius: 12,
    borderWidth: 1, borderColor: '#e4e4e7',
    padding: width * 0.04,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  contactCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  contactIcon:     { fontSize: width * 0.055, color: '#71717a' },
  contactLabel: {
    fontSize: width * 0.025, fontWeight: '700',
    color: '#71717a', textTransform: 'uppercase',
    letterSpacing: 0.8, marginBottom: 3,
  },
  contactValue: { fontSize: width * 0.038, color: '#181c22', fontWeight: '500' },
  editBtn: {
    width: width * 0.095, height: width * 0.095,
    borderRadius: width * 0.0475,
    borderWidth: 1, borderColor: '#e4e4e7',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  editBtnText: { fontSize: width * 0.04, color: '#005baf' },

  // Primary button
  primaryBtn: {
    height: height * 0.07, backgroundColor: '#005baf',
    borderRadius: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 10,
    elevation: 4, marginTop: 4,
    shadowColor: '#005baf', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 10,
  },
  primaryBtnText: { fontSize: width * 0.04, fontWeight: '700', color: '#fff' },

  // Bottom nav — paddingBottom set dynamically via insets in screen
  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingHorizontal: width * 0.02,
    paddingTop: height * 0.012,
    backgroundColor: '#f9f9ff',
    borderTopWidth: 1, borderTopColor: '#c1c6d5',
  },
  navItem: {
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: width * 0.03, paddingVertical: 4, borderRadius: 12,
  },
  navItemActive:  { backgroundColor: '#e8f0fc' },
  navIcon:        { fontSize: width * 0.055, marginBottom: 2 },
  navLabel:       { fontSize: width * 0.028, color: '#414753', fontWeight: '500' },
  navLabelActive: { color: '#005baf', fontWeight: '700' },
});
