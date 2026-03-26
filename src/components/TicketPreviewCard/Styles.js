import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: width * 0.04,
  },

  // Blue card header
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#137fec",
    paddingHorizontal: width * 0.05,
    paddingVertical: 16,
  },
  cardHeaderTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 2,
  },

  // Transport
  transportSection: {
    alignItems: "center",
    paddingVertical: 18,
  },
  transportHindi: {
    fontSize: width * 0.055,
    fontWeight: "700",
    color: "#212121",
  },
  transportEng: {
    fontSize: width * 0.032,
    color: "#9e9e9e",
    marginTop: 2,
  },

  // Meta
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: width * 0.05,
    paddingVertical: 12,
  },
  metaText: {
    fontSize: width * 0.033,
    color: "#757575",
    lineHeight: 20,
  },
  seatBox: {
    alignItems: "flex-end",
  },
  seatLabel: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
  },
  seatNo: {
    fontSize: width * 0.065,
    fontWeight: "800",
    color: "#212121",
  },

  // Route
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: 14,
  },
  routeStop: {
    flex: 1,
  },
  routeStopRight: {
    alignItems: "flex-end",
  },
  stopLabel: {
    fontSize: width * 0.03,
    color: "#9e9e9e",
    marginBottom: 2,
  },
  stopName: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#212121",
  },
  busCenter: {
    alignItems: "center",
    flex: 1,
  },
  distance: {
    fontSize: width * 0.033,
    color: "#137fec",
    fontWeight: "600",
    marginTop: 2,
  },
  departure: {
    fontSize: width * 0.028,
    color: "#9e9e9e",
    marginTop: 2,
  },

  // Fare
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: 8,
  },
  fareLabel: {
    fontSize: width * 0.038,
    color: "#212121",
  },
  fareAmount: {
    fontSize: width * 0.038,
    color: "#212121",
  },

  // Total
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: 14,
  },
  totalLabel: {
    fontSize: width * 0.045,
    fontWeight: "800",
    color: "#212121",
  },
  totalAmount: {
    fontSize: width * 0.045,
    fontWeight: "800",
    color: "#212121",
  },

  // Footer
  footer: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 3,
  },
  footerText: {
    fontSize: width * 0.032,
    color: "#757575",
  },
  footerBold: {
    fontSize: width * 0.038,
    fontWeight: "700",
    color: "#212121",
    marginTop: 4,
  },
});
