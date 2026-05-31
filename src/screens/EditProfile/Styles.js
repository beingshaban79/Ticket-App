import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary:               '#005baf',
  primaryFixed:          '#d5e3ff',
  onPrimary:             '#ffffff',
  background:            '#f9f9ff',
  surface:               '#f9f9ff',
  surfaceContainerLowest:'#ffffff',
  onSurface:             '#181c22',
  onSurfaceVariant:      '#414753',
  outlineVariant:        '#c1c6d5',
  outline:               '#717785',
  secondary:             '#585e6c',
  zinc200:               '#e4e4e7',
  zinc500:               '#71717a',
  white:                 '#ffffff',
  green:                 '#16a34a',
};

export default StyleSheet.create({
  safeArea:      { flex: 1, backgroundColor: '#f9f9ff' },
  container:     { flex: 1, backgroundColor: '#f9f9ff' },
  scrollContent: {
    paddingHorizontal: width * 0.04,
    paddingTop:        height * 0.025,
    paddingBottom:     height * 0.04,
  },

  // Header
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: width * 0.04,
    height:            height * 0.08,
    backgroundColor:   '#f9f9ff',
    borderBottomWidth: 1,
    borderBottomColor: '#c1c6d5',
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

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: height * 0.04, marginTop: height * 0.01 },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: width * 0.24, height: width * 0.24,
    borderRadius: width * 0.12,
    borderWidth: 2, borderColor: '#d5e3ff',
  },
  cameraBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#005baf',
    width: width * 0.085, height: width * 0.085,
    borderRadius: width * 0.0425,
    alignItems: 'center', justifyContent: 'center',
    elevation: 3,
  },
  cameraBadgeText: { fontSize: width * 0.04, color: '#fff' },
  avatarHint: {
    marginTop: height * 0.015,
    fontSize: width * 0.028, fontWeight: '700',
    color: '#585e6c', textTransform: 'uppercase', letterSpacing: 1,
  },

  // Form
  formSection:  { gap: height * 0.025 },
  fieldGroup:   { gap: 6 },
  fieldLabel: {
    fontSize: width * 0.028, fontWeight: '700',
    color: '#414753', textTransform: 'uppercase', letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#c1c6d5',
    borderRadius: 10,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.016,
    gap: 10,
  },
  inputWrapperFocused: { borderColor: '#005baf' },
  textInput: { flex: 1, fontSize: width * 0.038, color: '#181c22', padding: 0 },
  inputIcon:        { fontSize: width * 0.04, color: '#c1c6d5' },
  inputIconFocused: { color: '#005baf' },

  // Locked field
  lockedWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f3f3f5',
    borderWidth: 1, borderColor: '#e4e4e7',
    borderRadius: 10,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.016,
    gap: 10,
  },
  lockedIcon:  { fontSize: width * 0.045, color: '#71717a' },
  lockedText:  { flex: 1, fontSize: width * 0.038, color: '#71717a' },
  lockIcon:    { fontSize: width * 0.035, color: '#71717a' },
  fieldHint: {
    fontSize: width * 0.028, color: '#71717a',
    fontStyle: 'italic', marginTop: 3, paddingHorizontal: 2,
  },

  // Buttons
  actionRow: { flexDirection: 'row', gap: 12, marginTop: height * 0.015 },
  cancelBtn: {
    flex: 1, paddingVertical: height * 0.018,
    borderRadius: 14, borderWidth: 1, borderColor: '#717785',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cancelBtnText: { fontSize: width * 0.038, fontWeight: '700', color: '#414753' },
  saveBtn: {
    flex: 1, paddingVertical: height * 0.018,
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    elevation: 3,
    shadowColor: '#005baf', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25, shadowRadius: 8,
  },
  saveBtnDefault: { backgroundColor: '#005baf' },
  saveBtnSuccess: { backgroundColor: '#16a34a' },
  saveBtnText:    { fontSize: width * 0.038, fontWeight: '700', color: '#fff' },

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
