import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
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
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  iconCircle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: "#e8f1fd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: height * 0.025,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#0d141b",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: "#6b7280",
    lineHeight: width * 0.055,
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  inputSpacing: { marginBottom: height * 0.02 },
  footer: {
    padding: width * 0.05,
    paddingBottom: height * 0.03,
  },
  btnSpacing: { marginBottom: height * 0.015 },
  backText: {
    textAlign: "center",
    color: "#137fec",
    fontWeight: "600",
    fontSize: width * 0.038,
  },
});
