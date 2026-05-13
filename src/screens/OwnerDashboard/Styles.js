import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#f6f7f8" },
  scroll: { padding: width * 0.04, paddingBottom: height * 0.04 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  headerTitle: { fontSize: width * 0.055, fontWeight: "700", color: "#0d141b" },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: "#e8f1fd",
    justifyContent: "center",
    alignItems: "center",
  },

  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    elevation: 1,
  },
  statBox:   { flex: 1, alignItems: "center" },
  statValue: { fontSize: width * 0.055, fontWeight: "700", color: "#0d141b" },
  statLabel: { fontSize: width * 0.03, color: "#64748b", marginTop: 2 },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: height * 0.02,
    gap: width * 0.025,
  },
  actionCard: {
    width: (width - width * 0.08 - width * 0.025 * 3) / 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: height * 0.015,
    alignItems: "center",
    elevation: 1,
  },
  actionText: {
    fontSize: width * 0.028,
    fontWeight: "600",
    color: "#0d141b",
    marginTop: 4,
    textAlign: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  sectionTitle: { fontSize: width * 0.045, fontWeight: "700", color: "#0d141b" },
  viewAll:      { color: "#137fec", fontSize: width * 0.035, fontWeight: "600" },

  busCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    elevation: 1,
  },
  busCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: height * 0.012,
  },
  busName:  { fontSize: width * 0.04, fontWeight: "700", color: "#0d141b" },
  busRoute: { fontSize: width * 0.03, color: "#64748b", marginTop: 2 },
  activeBadge: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  activeBadgeText: { color: "#16a34a", fontSize: width * 0.03, fontWeight: "600" },

  stopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  stopLabel:     { color: "#64748b", fontSize: width * 0.033 },
  stopHighlight: { color: "#137fec", fontWeight: "600", fontSize: width * 0.033 },
  stopValue:     { color: "#0d141b", fontSize: width * 0.033 },

  infoGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: height * 0.01 },
  infoBox:     { width: "50%", marginBottom: 6 },
  infoBoxFull: { width: "100%" },
  infoLabel: { fontSize: width * 0.028, color: "#64748b" },
  infoValue: { fontSize: width * 0.035, fontWeight: "600", color: "#0d141b" },
});
