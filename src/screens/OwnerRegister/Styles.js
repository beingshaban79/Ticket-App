import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#0d141b",
  },
  headerRight: { width: 32 },
  scroll: { padding: width * 0.05, paddingBottom: height * 0.04 },
  pageTitle: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#0d141b",
    marginBottom: height * 0.025,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: "#0d141b",
    marginTop: height * 0.01,
    marginBottom: height * 0.015,
  },
  label: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  inputSpacing: { marginBottom: height * 0.018 },
  footer: { marginTop: height * 0.02 },
  btnSpacing: { marginBottom: height * 0.018 },
  loginText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: width * 0.035,
  },
  link: { color: "#137fec", fontWeight: "600" },
});
