import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#f6f7f8" },
  scroll: { padding: width * 0.05, paddingBottom: 40 },
  heading: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#0d141b",
    marginBottom: 4,
  },
  sub: {
    fontSize: width * 0.033,
    color: "#64748b",
    marginBottom: width * 0.06,
  },
  sectionLabel: {
    fontSize: width * 0.03,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1.2,
    marginBottom: width * 0.03,
    marginTop: width * 0.02,
  },
  btn: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * 0.03,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: width * 0.038,
  },
});
