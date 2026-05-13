import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: width * 0.05 },
  wrapper: { width: "100%", maxWidth: 440, alignSelf: "center" },
  logoWrapper: { alignItems: "center", marginBottom: height * 0.02 },
  logoIcon: { fontSize: width * 0.14 },
  title: {
    textAlign: "center",
    fontSize: width * 0.07,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    fontSize: width * 0.035,
    color: "#6b7280",
    marginTop: 6,
    marginBottom: height * 0.025,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: width * 0.05,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: width * 0.035,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  inputSpacing: { marginBottom: height * 0.018 },
  forgot: { alignItems: "flex-end", marginBottom: height * 0.02 },
  forgotText: { color: "#137fec", fontSize: width * 0.033, fontWeight: "500" },
  footer: {
    textAlign: "center",
    marginTop: height * 0.025,
    color: "#6b7280",
    fontSize: width * 0.035,
  },
  link: { color: "#137fec", fontWeight: "600" },
});
