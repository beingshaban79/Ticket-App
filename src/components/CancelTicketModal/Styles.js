import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    fontSize: 24,
    color: "#ef4444",
    fontWeight: "bold",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  actions: {
    flexDirection: "row",
    width: "100%",
  },

  btnSecondary: {
    flex: 1,
    height: 48,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  btnSecondaryText: {
    fontWeight: "600",
    color: "#0f172a",
  },

  btnDanger: {
    flex: 1,
    height: 48,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },

  btnDangerText: {
    color: "#fff",
    fontWeight: "700",
  },
});